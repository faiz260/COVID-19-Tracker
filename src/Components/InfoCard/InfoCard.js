import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import"./InfoCard.css"

function InfoCard({ title, cases, total }) {
  return (
      <Card className="infoCard">
        <CardContent>
          <Typography className="infoCard_title" color="textSecondary">
            {title} 
          </Typography>
          Today
          <h2 className="infoCard_cases">
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
