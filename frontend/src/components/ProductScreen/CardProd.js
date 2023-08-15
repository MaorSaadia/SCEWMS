import React from 'react';

const CardProd = (props) => {
  return (
        <div className="card_prod" >
            <img src={props.img} className="card-img-top" alt="pic"/>
            <div className="card-body">
                <h5 className="card-title-card-prod">{props.header}</h5>
                <p className="card-text">{props.p}</p>
                <a href={props.href} className="btn btn-primary">{props.a}</a>
            </div>
        </div>
    
  );
};

export default CardProd;
