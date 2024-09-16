export default function Alert({ title }: { title: any }) {
  return (
    <div className=" flex justify-center items-center bg-red-600 p-4 h-full">
      <div className="text-3xl font-semibold text-red-100">{title}</div>
    </div>
  );
}
