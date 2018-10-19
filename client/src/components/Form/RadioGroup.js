import React from "react";

export const RadioGroup = props => (
  // <div className="form-check form-check-inline">
  //   <input class="form-check-input" type="checkbox" {...props} />
  //   <label class="form-check-label" for="inlineCheckbox1"/>
  // </div>

  // <div className="form-check form-check-inline">
  //   <input className="form-check-input" type="checkbox" id="inlineCheckbox1"/>
  //   <label className="form-check-label" for="inlineCheckbox1">{props.option}</label>
  // </div>
<div>
  <label htmlFor="sensitive">Is this a sensitive item like a used syringe that would require a referral to the proper authorities?</label>
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="YES"/>
    <label class="form-check-label" for="inlineCheckbox1">YES</label>
  </div>
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="NO"/>
    <label class="form-check-label" for="inlineCheckbox2">NO</label>
  </div>
</div>
);