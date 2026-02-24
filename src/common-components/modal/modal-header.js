const ModalHeaderSteps = ({ title, content }) => {
  return (
    <div className="w-[100%] border-b">
      <div className="w-[60%] flex items-center justify-between top-0 bg-white z-10 p-4">
        <div className="text-lg font-semibold">{title}</div>
        {content && content}
      </div>
    </div>
  );
};
export default ModalHeaderSteps;
