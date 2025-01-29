import ChatBot from "./components/ChatBot";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-game bg-cover bg-center bg-no-repeat bg-fixed">
      <ChatBot />
    </div>
  );
}
