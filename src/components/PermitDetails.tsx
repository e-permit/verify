import FlagIcon from "./flags/FlagIcon";

export default function PermitDetails({
  permit,
  offline,
}: {
  permit: any;
  offline: boolean;
}) {
  return (
    <div className="flex flex-col h-full p-6 pb-2 ">
      {offline && (
        <div className="bg-red-600 text-white font-semibold text-center w-full py-2 rounded-lg shadow">
          OFFLINE VERIFICATION
        </div>
      )}
      <div className="flex justify-between items-center h-fit">
        <div className="flex flex-col justify-center">
          <span className="text-base font-bold leading-7 text-gray-900 whitespace-nowrap text-4xl">
            E-Permit
          </span>
          <span className="text-2xl font-semibold tracking-wide text-gray-700">
            Details
          </span>
        </div>
        <div className="flex flex-col items-end justify-center text-emerald-600 w-fit">
          <div className="text-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
              />
            </svg>
          </div>
          <span className="font-semibold text-xl">Verified</span>
        </div>
      </div>
      <div className="mt-6 border-t border-gray-100 grow overflow-y-scroll drop-shadow-sm">
        <dl className="divide-y divide-gray-100">
          <div className="bg-gray-50 p-2 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">ID</dt>
            <dd className="text-sm leading-3 text-gray-700 sm:col-span-2 sm:mt-0">
              {permit.permit_id}
            </dd>
          </div>
          <div className="bg-white p-2 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">
             Issuer
            </dt>
            <dd className="flex gap-2 items-center text-sm leading-3 text-gray-700 sm:col-span-2 sm:mt-0">
            <FlagIcon code={permit.issuer.toLowerCase()} /> 
              {permit.issuer_name}
            </dd>
          </div>
          <div className="bg-gray-50 p-2 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Issued for
            </dt>
            <dd className="flex gap-2 items-center text-sm leading-3 text-gray-700 sm:col-span-2 sm:mt-0">
            <FlagIcon code={permit.issued_for.toLowerCase()} /> 
              {permit.issued_for_name}
            </dd>
          </div>
          <div className="bg-white p-2 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Year
            </dt>
            <dd className="text-sm leading-3 text-gray-700 sm:col-span-2 sm:mt-0">
              {permit.permit_year}
            </dd>
          </div>
          <div className="bg-gray-50 p-2 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Type
            </dt>
            <dd className="text-sm leading-3 text-gray-700 sm:col-span-2 sm:mt-0">
              {permit.permit_type_name}
            </dd>
          </div>
          <div className="bg-white p-2 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Issued at
            </dt>
            <dd className="text-sm leading-3 text-gray-700 sm:col-span-2 sm:mt-0">
              {permit.issued_at}
            </dd>
          </div>
          <div className="bg-gray-50 p-2 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Expires at
            </dt>
            <dd className="text-sm leading-3 text-gray-700 sm:col-span-2 sm:mt-0">
              {permit.expires_at}
            </dd>
          </div>
          <div className="bg-white p-2 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Plate Number
            </dt>
            <dd className="text-sm leading-3 text-gray-700 sm:col-span-2 sm:mt-0">
              {permit.plate_number}
            </dd>
          </div>
          <div className="bg-gray-50 p-2 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Company Name
            </dt>
            <dd className="text-sm leading-3 text-gray-700 sm:col-span-2 sm:mt-0">
              {permit.company_name}
            </dd>
          </div>
          {permit.company_id && (
            <div className="bg-white p-2 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-3">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Company ID
              </dt>
              <dd className="text-sm leading-3 text-gray-700 sm:col-span-2 sm:mt-0">
                {permit.company_id}
              </dd>
            </div>
          )}
          {permit.plate_number2 && (
            <div className="bg-gray-50 p-2 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-3">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Plate Number2
              </dt>
              <dd className="text-sm leading-3 text-gray-700 sm:col-span-2 sm:mt-0">
                {permit.plate_number2}
              </dd>
            </div>
          )}
           {permit.departure_country && (
            <div className="bg-white p-2 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-3">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Departure Country
              </dt>
              <dd className="text-sm leading-3 text-gray-700 sm:col-span-2 sm:mt-0">
                {permit.departure_country_name}
              </dd>
            </div>
          )}
          {permit.arrival_country && (
            <div className="bg-white p-2 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-3">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Arrival Country
              </dt>
              <dd className="text-sm leading-3 text-gray-700 sm:col-span-2 sm:mt-0">
                {permit.arrival_country_name}
              </dd>
            </div>
          )} 
          {permit.revoked && (
            <div className="bg-white p-2 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-3">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Revoked
              </dt>
              <dd className="text-sm leading-3 text-gray-700 sm:col-span-2 sm:mt-0">
                {permit.revoked}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}
