import React, { ReactNode } from "react";

const EntityDetails: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden p-3">
      <h1 className="text-2xl font-bold mb-4">Entity Details</h1>

      <div className="grid gap-x-4 gap-y-8 grid-cols-2">
        {Object.entries(data).map(([key, value]) => {
          if (key === "_id") {
            return 
          } else {
            return (
              <div key={key} className="mb-4 ">
                <h2 className="text-lg font-semibold mb-2 block text-black">
                  {key}
                </h2>
                {Array.isArray(value) ? (
                  <ul className="list-disc list-inside">
                    {value.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{value!.toString()}</p>
                )}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default EntityDetails;
