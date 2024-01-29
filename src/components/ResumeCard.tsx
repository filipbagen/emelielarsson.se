import React from 'react';

const ResumeCard = ({ section }) => {
  return (
    <div className="flex justify-between bg-white p-14 rounded-lg">
      <div className="flex flex-col gap-2 w-full">
        <h3 className="text-secondary">{section.year}</h3>
        <p>{section.universityName.toUpperCase()}</p>
        <p>{section.degreeLevel}</p>
      </div>

      <div className="w-[745px]">
        <p>{section.body}</p>
      </div>
    </div>
  );
};

export default ResumeCard;
