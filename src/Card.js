// function Card(props) {
function Card({ product, imgUrl }) {
  // function Card({ product: { title, price }, imgUrl }) {

  return (
    <>
      <div className="col-md-4">
        <img src={imgUrl} width="80%" />
        <h4>{product.title}</h4>
        <p>{product.price}</p>
      </div>
    </>
  );
}

export default Card;
