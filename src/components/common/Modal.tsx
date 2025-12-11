interface ModalProps {
  description: string;
 
}

export default function Modal({ description }: ModalProps) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center">
      <div
        className={`pointer-events-auto w-auto max-w-sm transform rounded-lg border border-indigo-400 bg-black/80 px-4 py-3 shadow-lg backdrop-blur-sm transition-all duration-300 ease-out $"translate-y-0 opacity-100" : "-translate-y-4 opacity-0"`}
      >
        <p className="text-center text-sm font-medium text-indigo-300">
          {description}
        </p>
      </div>
    </div>
  );
}
