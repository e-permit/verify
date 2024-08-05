export default function Alert({ title }: { title: any }) {
  return (
    <div className=" rounded-md bg-red-100 p-4 ">
      <div className="flex justify-center align-middle ">
        <div className="ml-3">
          <h3 className="text-lg font-semibold text-red-800">{title}</h3>
        </div>
      </div>
    </div>
  );
}
