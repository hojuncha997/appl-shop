// function Card(props) {
function Card({ products, index }) {
  // function Card({ product: { title, price }, imgUrl }) {

  // console.log("products", products[0]);
  // console.log("index", index);
  return (
    <>
      <div className="col-md-4">
        <img
          src={
            "https://codingapple1.github.io/shop/shoes" + (index + 1) + ".jpg"
          }
          width="80%"
        />

        <h4>{products[index].title}</h4>
        <p>{products[index].price}</p>
      </div>
    </>
  );
}

export default Card;
