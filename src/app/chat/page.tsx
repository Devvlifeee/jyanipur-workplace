export default function ChatPage() {
  return (
    <div className="w-full h-[calc(100vh-64px)] bg-white overflow-hidden">
      <iframe
        src="http://localhost:3001?embed=true"
        title="Jyanipur Chat"
        className="w-full h-full border-none"
        allow="camera; microphone; clipboard-read; clipboard-write;"
      />
    </div>
  );
}