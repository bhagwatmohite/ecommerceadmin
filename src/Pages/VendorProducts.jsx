/* eslint-disable react/prop-types */
// const VendorProducts = () => {
//   const vendorData = {
//     "vendorName": "Jainee",
//     "shopName": "Best Deals Shop",

//     "products": [
//       {
//         "productName": "Widget A",
//         "brandName": "ABC Brand",
//         "description": "High-quality widget",
//         "sellPrice": 25.99,
//         "basicPrice": 20.99,
//         "size": "Medium",
//         "stockCount": 50,
//         "image": "widgetA.jpg",
//         "color": "Blue"
//       },

//     ]
//   };

//   return (
//     <div>
//       <h2>Vendor Name: {vendorData.vendorName}</h2>
//       <h2>Shop Name: {vendorData.shopName}</h2>
//       <h3>Products:</h3>
//       <ul>
//         {vendorData.products.map((product, index) => (
//           <li key={index}>
//             <h4>{product.productName}</h4>
//             <p>Brand: {product.brandName}</p>
//             <p>Description: {product.description}</p>
//             <p>Sell Price: ${product.sellPrice}</p>
//             <p>Basic Price: ${product.basicPrice}</p>
//             <p>Size: {product.size}</p>
//             <p>Stocks Available: {product.stockCount}</p>
//             <img src={product.image} alt={product.productName} style={{ maxWidth: '100px' }} />
//             <p>Color: {product.color}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default VendorProducts;


const VendorProducts = ({ vendorData }) => {
  // Function to count products by category




  return (

    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingLeft: '30%' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title mb-4">Vendor Information</h2>
                <h3 className="card-subtitle mb-3">Vendor Name: {vendorData.firstName}</h3>
                <h3 className="card-subtitle mb-3">Shop Name: {vendorData.shopname}</h3>
                <h4 className="card-subtitle mb-3">Total Products: {vendorData.products.length}</h4>
              </div>
            </div>
            <button className="btn btn-primary mt-3" >Back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProducts;


