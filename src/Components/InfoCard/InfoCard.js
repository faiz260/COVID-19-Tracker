import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import"./InfoCard.css"

function InfoCard({ title, isRed, isBlue, isGreen, cases, active, total, ...props }) {
  return (
      <Card onClick={props.onClick}
       className={`infoCard ${active && "infoCard--selected"}
        ${isRed && "infoCard--red"} ${isBlue && "infoCard--blue"} ${isGreen && "infoCard--green"} `}>
        <CardContent>
          <Typography className="infoCard_title" color="textSecondary">
            {title} 
          </Typography>
          Today
          <h2 className={`infoCard_cases 
          ${!isRed && !isBlue && "infoCard__cases--green"}
          ${!isRed && !isGreen && "infoCard__cases--blue"}
          `}>
            {cases}
          </h2>
          <Typography className="infoCard_total">
            {total} Total
          </Typography>
        </CardContent>
      </Card>
  );
}

export default InfoCard;
