import { useEffect, useState } from "react";
import { useParams , useNavigate} from "react-router";
import { verifyPermit } from "../utils";

export default function PermitView() {
  const navigate = useNavigate();

  const { qrCode } = useParams();
  const [permit, setPermit] = useState<any>();
  useEffect(() => {
    const verify = async () => {
      const data = await verifyPermit(qrCode!);
      setPermit(data?.permit);
    };
    verify().catch(console.error);
  }, []);

   const handleClick = () => {
    navigate("/");
   }

  return (
    <div>
      {permit && (
        <div>
          <div className="flex justify-between">
            <div className="self-center">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                E- PERMIT
              </h3>
            </div>
            <div className="flex flex-col items-center justify-center text-emerald-600 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-9"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                />
              </svg>
              <span className="font-semibold">Verified</span>
            </div>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-3">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  ID
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {permit.permit_id}
                </dd>
              </div>
              <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-3">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Issuer
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {permit.issuer}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-3">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Issued for
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {permit.issued_for}
                </dd>
              </div>
              <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-3">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Year
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {permit.permit_year}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-3">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Type
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {permit.permit_type}
                </dd>
              </div>
              <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-3">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Issued at
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {permit.issued_at}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-3">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Expires at
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {permit.expires_at}
                </dd>
              </div>
              <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-3">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Plate Number
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {permit.plate_number}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-3">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Company Name
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {permit.company_name}
                </dd>
              </div>
            </dl>
          </div>
          <div className="flex justify-center m-10">
            <button className="bg-gray-200 px-2.5 py-1 text-gray-900  font-semibold shadow-sm p-10 rounded-full ring-1 ring-inset ring-gray-300" onClick={handleClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="black"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
