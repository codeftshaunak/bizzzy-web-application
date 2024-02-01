import AgencyTitle from "./AgencyTitle";

const AgencyOverview = ({ overview, setIsUpdate }) => {
  return (
    <div>
      <AgencyTitle
        data={overview}
        setIsUpdate={setIsUpdate}
        isValue={!!overview}
      >
        Overview
      </AgencyTitle>
      {overview && (
        <article className="prose agency_overview">
          <style>
            {`
              .agency_overview * {
                margin: 0 !important;
                padding: 0 !important;
              }
            `}
          </style>
          <div dangerouslySetInnerHTML={{ __html: overview }} />
        </article>
      )}
    </div>
  );
};

export default AgencyOverview;
