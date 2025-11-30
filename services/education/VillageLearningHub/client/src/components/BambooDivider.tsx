export default function BambooDivider() {
  return (
    <div className="w-full py-8">
      <div className="relative h-1 w-full">
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <div className="h-1 flex-1 bg-gradient-to-r from-transparent via-primary/30 to-primary/30"></div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-6 w-1 bg-primary/40 rounded-full"></div>
            ))}
          </div>
          <div className="h-1 flex-1 bg-gradient-to-l from-transparent via-primary/30 to-primary/30"></div>
        </div>
      </div>
    </div>
  );
}
