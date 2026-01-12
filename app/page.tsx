export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-linear-to-br from-background to-secondary">
      <div className="text-center px-4">
        <h1 className="text-5xl font-bold text-foreground mb-4">
          Welcome Home
        </h1>
        <p className="text-lg text-muted-foreground">
          Explore, learn, and grow with us
        </p>
      </div>
    </div>
  );
}
