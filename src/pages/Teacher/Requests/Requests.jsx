import React from "react";
import BiitSAS from "../../../assets/extra/biitSAS.png";
function Requests() {
  return (
    <>
      <div className="flex flex-col">
        <img src={BiitSAS} alt="Biit SAS" className="flex self-center" />
        <div className="flex justify-center">
          <div class="card w-25">
            <div class="card-body">
              <div className="flex justify-around space-x-3">
                <span>Project-Title:</span>
                <span className="font-bold">Ai Health Engine</span>
              </div>
              <div className="flex justify-around space-x-3">
                <span>Group Cgpa:</span>
                <span className="font-bold text-left">3.4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Requests;
