import { FC, ReactNode } from "react";

const ModalFooter: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex justify-between items-center bg-white bottom-0 left-0 right-0 px-4 pb-3 pt-4 border-t">
      {children}
    </div>
  );
};
export default ModalFooter;
