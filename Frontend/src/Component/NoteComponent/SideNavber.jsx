import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars, FaPlus, FaQuestionCircle, FaCog,
  FaEllipsisV, FaEdit, FaTrash, FaShareAlt
} from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../Backend/services/firebase";
import Body from "./Body";
import jsPDF from "jspdf";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);
  const [userFiles, setUserFiles] = useState([]);
  const [user, setUser] = useState(null);
  const [activeFile, setActiveFile] = useState({ fileName: "", content: "", id: null });

  const sidebarExpanded = isOpen || isExpanded;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (currentUser) => {
      setUser(currentUser);
      if (currentUser) fetchUserFiles(currentUser.uid);
    });
    return () => unsubscribe();
  }, []);

  const fetchUserFiles = async (uid) => {
    const q = query(collection(db, "notes"), where("userId", "==", uid));
    const querySnapshot = await getDocs(q);
    const files = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUserFiles(files);
  };

  const handleLogout = () => {
    signOut(getAuth())
      .then(() => {
        console.log("User signed out.");
        window.location.href = "/";
      })
      .catch((error) => console.error("Sign-out error:", error));
  };

  const deleteNote = async (noteId) => {
    await deleteDoc(doc(db, "notes", noteId));
    setUserFiles(userFiles.filter(file => file.id !== noteId));
    setMenuOpen(null);
  };

  const editNote = (noteId) => {
    const file = userFiles.find(file => file.id === noteId);
    if (file) {
      setActiveFile({ fileName: file.fileName, content: file.content, id: file.id });
    }
  };
  

  const createNewFile = async () => {
    const baseName = "Untitled";
    let newName = baseName;
    let count = 1;
    const existingNames = userFiles.map(file => file.fileName);
  
    while (existingNames.includes(newName)) {
      newName = `${baseName} [${count}]`;
      count++;
    }
  
    const newNote = {
      fileName: newName,
      content: "",
      userId: user.uid,
      createdAt: Timestamp.now()
    };
  
    const docRef = await addDoc(collection(db, "notes"), newNote);
  
    // Append the newly created file to the sidebar list instantly
    const newFile = { ...newNote, id: docRef.id };
    setUserFiles(prevFiles => [...prevFiles, newFile]);
  
    // Optional: if you want to auto-load it into the editor, set a selectedFile state
    // or directly call editNote(newFile.id);
  };

  const shareNote = async (noteId) => {
    const note = userFiles.find(file => file.id === noteId);
    if (!note) return;

    const docPDF = new jsPDF();
    docPDF.text(note.fileName || "Untitled", 10, 10);
    docPDF.text(note.content || "", 10, 20);
    const pdfBlob = docPDF.output("blob");

    const file = new File([pdfBlob], `${note.fileName || "Untitled"}.pdf`, { type: "application/pdf" });

    if (navigator.share) {
      const shareData = {
        title: note.fileName || "Untitled",
        text: "Check out this note!",
        files: [file],
      };
      try {
        await navigator.share(shareData);
        console.log("Note shared successfully");
      } catch (err) {
        console.error("Error sharing note:", err);
      }
    } else {
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${note.fileName || "Untitled"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const toggleSidebar = () => setIsOpen(prev => !prev);

  return (
    <div className="flex">
      {/* Sidebar */}
      <motion.div
        className="fixed top-0 left-0 h-screen bg-[#161b28] text-white flex flex-col shadow-lg z-20"
        initial={{ width: "4rem" }}
        animate={{ width: sidebarExpanded ? "16rem" : "4rem" }}
        transition={{ duration: 0.4 }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Menu Icon */}
        <div className="p-3 flex justify-center mt-6">
          <FaBars className="text-2xl cursor-pointer" onClick={toggleSidebar} />
        </div>

        {/* Middle Section */}
        <div className="flex-1 flex flex-col items-center mt-2 space-y-4">
          <NavItem
            icon={<div className="bg-gray-600 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer"><FaPlus /></div>}
            text="New File"
            isExpanded={sidebarExpanded}
            onClick={createNewFile}
          />

          {/* File List */}
          {sidebarExpanded && (
            <div className="w-full px-2">
              {userFiles.length === 0 ? (
                <p className="text-center text-gray-400 mt-2">No files yet</p>
              ) : (
                userFiles.map((file) => (
                  <div
                    key={file.id}
                    className="relative flex items-center justify-between px-3 py-2 hover:bg-gray-700 rounded-md cursor-pointer mb-1"
                  >
                    <span className="truncate" onClick={() => editNote(file.id)}>{file.fileName || 'Untitled'}</span>
                    <FaEllipsisV
                      className="cursor-pointer"
                      onClick={() => setMenuOpen(menuOpen === file.id ? null : file.id)}
                    />

                    <AnimatePresence>
                      {menuOpen === file.id && (
                        <motion.div
                          className="absolute right-2 top-10 bg-gray-800 text-white shadow-md rounded-md w-32 z-10"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                        >
                          <button className="flex items-center px-3 py-2 w-full hover:bg-gray-700" onClick={() => editNote(file.id)}>
                            <FaEdit className="mr-2" /> Edit
                          </button>
                          <button className="flex items-center px-3 py-2 w-full hover:bg-gray-700" onClick={() => deleteNote(file.id)}>
                            <FaTrash className="mr-2" /> Delete
                          </button>
                          <button className="flex items-center px-3 py-2 w-full hover:bg-gray-700" onClick={() => shareNote(file.id)}>
                            <FaShareAlt className="mr-2" /> Share
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center space-y-5 mb-4 p-1">
          <NavItem icon={<FaQuestionCircle />} text="Help" isExpanded={sidebarExpanded} onClick={() => window.location.href = "/help"} />
          <NavItem icon={<MdLogout />} text="Logout" isExpanded={sidebarExpanded} onClick={handleLogout} />
          <NavItem icon={<FaCog />} text="Settings" isExpanded={sidebarExpanded} />
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="flex-1"
        initial={{ marginLeft: "4rem" }}
        animate={{ marginLeft: sidebarExpanded ? "16rem" : "4rem" }}
        transition={{ duration: 0.4 }}
      >
        <Body activeFile={activeFile} setActiveFile={setActiveFile} />
      </motion.div>
    </div>
  );
}

function NavItem({ icon, text, isExpanded, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center w-full cursor-pointer hover:bg-gray-700 px-2 py-2 rounded-2xl"
    >
      {icon}
      <AnimatePresence>
        {isExpanded && (
          <motion.span
            className="ml-3"
            style={{ fontSize: "12px" }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
          >
            {text}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
