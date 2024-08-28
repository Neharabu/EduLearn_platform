/* eslint-disable react/prop-types */

const Section = ({ topic }) => {
  return (
    <section className="w-full h-auto flex-col p-3 flex gap-3">
      <span className="font-bold text-xl font-mont text-white">
        {topic?.title}
      </span>
      <span className="font-mont text-gray-400">{topic?.description}</span>
      {topic?.image && (
        <img src={topic?.image} className="w-1/2 rounded-md " alt="" />
      )}
    </section>
  );
};

export default Section;
