import React, { createContext, useContext, useState } from "react";
import DownloadModal from "../components/community/DownloadModal";

interface DownloadModalContextType {
  openDownloadModal: () => void;
  closeDownloadModal: () => void;
}

const DownloadModalContext = createContext<DownloadModalContextType | undefined>(undefined);

export const DownloadModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDownloadModal = () => setIsOpen(true);
  const closeDownloadModal = () => setIsOpen(false);

  return (
    <DownloadModalContext.Provider value={{ openDownloadModal, closeDownloadModal }}>
      {children}
      <DownloadModal isOpen={isOpen} onClose={closeDownloadModal} />
    </DownloadModalContext.Provider>
  );
};

export const useDownloadModal = () => {
  const context = useContext(DownloadModalContext);
  if (!context) {
    throw new Error("useDownloadModal must be used within a DownloadModalProvider");
  }
  return context;
};
