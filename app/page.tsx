import { Button } from "@/components/Button";

export default function Page() {
  return (
    <div className="min-h-screen flex-center">
      <Button>Click me</Button>
      <Button variant="destructive">Click me</Button>
      <Button variant="outline">Click me</Button>
      <Button variant="ghost">Click me</Button>
      <Button variant="link">Click me</Button>
    </div>
  );
}
