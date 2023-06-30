import React from "react";

function filterResults(results) {
  let filteredResults = [];
  for (var i = 0; i < results.length; ++i) {
    if (i === 0) {
      filteredResults.push(results[i]);
      continue;
    }

    if (results[i].decodedText !== results[i - 1].decodedText) {
      filteredResults.push(results[i]);
    }
  }
  return filteredResults;
}

const ResultContainerTable = ({ data }) => {
  const results = filterResults(data);
  return (
    <table>
      <thead>
        <tr>
          <td>#</td>
          <td className="px-2">Decoded Text</td>
          <td>Format</td>
        </tr>
      </thead>
      <tbody>
        {results.map((result, i) => {
          console.log(result);
          return (
            <tr key={i}>
              <td>{i}</td>
              <td className="px-2">{result.decodedText}</td>
              <td>{result.result.format.formatName}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const ResultContainerPlugin = (props) => {
  const results = filterResults(props.results);
  return (
    <div>
      <div>Scanned results ({results.length})</div>
      <div>
        <ResultContainerTable data={results} />
      </div>
    </div>
  );
};

export default ResultContainerPlugin;
