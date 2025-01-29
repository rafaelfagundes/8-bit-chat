export function LoadingBaloon({ message = "..." }: { message: string }) {
  return (
    <section className="message -left">
      <div className="nes-balloon from-left">
        <p className="animate-bounce">{message}</p>
      </div>
    </section>
  )
}
