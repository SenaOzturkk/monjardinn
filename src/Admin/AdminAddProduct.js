import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function AdminAddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
  
    if (name === 'price' || name === 'tax' || name === 'categoryId'  || name === 'discountedAmount'  || name === 'discountRate') {
      processedValue = parseInt(value, 10);
      if (isNaN(processedValue)) {
        processedValue = 0;
      }
    }
  
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: processedValue,
    }));
  };
  
  
  function handleFetchError(error) {
    if (error.response && error.response.status === 500) {
      return <p>Daha sonra tekrar deneyiniz.</p>;
    } else {
      return <p>Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.</p>;
    }
  }
  


    const fetchCategoryList = async () => {
      try {
        const response = await fetch(`https://api.monjardin.online/api/Category/GetMainCategories`);
        if (!response.ok) {
          throw new Error('Kategori listesi getirilemedi. Lütfen daha sonra tekrar deneyin.');
        }
        const data = await response.json();
       // console.log("cateogryyyyyyy",data.data)
        const categoryData= data.data;
       // console.log("category",categoryData);
        setCategories(categoryData);
        //setFilteredProducts(categoryData);
      } catch (error) {
       // console.error(error);
        const errorMessage = handleFetchError(error);
       // alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        //console.log(errorMessage);
      }
    };

  const handleKaydet = () => {
   // console.log("productSDSFDDGJJ",product);
    console.log("product",product);
    const { fileResponses, labelProducts, productDiscountInfo, categoryName, ...newProduct } = product;
    const updatedProduct = {
      ...newProduct,
      stock: 0
    };
    console.log("newww", updatedProduct);

    fetch("https://api.monjardin.online/api/Product/CreateProduct", {
      method: "POST",
      headers: {
        "Authorization": "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJlbWFpbCI6ImhpbGFsYmFzdGFuQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJIaWxhbCBCYcWfdGFuIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiYWRtaW4iLCJuYmYiOjE2ODM4OTY2NjMsImV4cCI6MTY4NjA1NjY2MywiaXNzIjoiTW9uSmFyZGluIiwiYXVkIjoiYXBpLm1vbmphcmRpbi5vbmxpbmUifQ.S7mNeJP5KuqRwzPBqCD7N87oZExLjgn0hvgFqWFK-iNCeXlVDcS7uLV1jAxxEcM84i4XcEHBWbAqKBPaG39y1w",
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((data) => {
       
        alert("Değişiklikler başarıyla kaydedilmiştir.")
      
        console.log(data)
      })
      .catch((error) => {
        //console.error(error)
        const errorMessage = handleFetchError(error);
        //console.log(errorMessage);
      });
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);
 
  const handleGoBack = () => {
    navigate(-1); // Bir önceki sayfaya yönlendirir
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return(
    <div style={{ marginTop:"50px", paddingLeft:"50px", paddingRight:"50px" }}>
       <h1  className='baslik'>Mon Jardin</h1>

<button onClick={handleGoBack} className='back-button' style={{marginBottom:"30px"}}><img src="/images/back-button.png" alt="" width={40} height={30}/></button>

        <>
        <div style={{display:"flex"}}>
            <div >
            <input type="file" onChange={handleImageUpload} />
      {previewImage && (
        <img src={previewImage} alt="Preview" style={{ width: "200px" }} />
      )}
             </div>
            <div style={{ display:"block",marginLeft: "100px" }}>
            <div style={{paddingTop:"20px"}}> 
              <span style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>Ürün Adı:</span>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleInputChange}
                className="edit-input-area"
              />
              </div>
              <hr/>
          
              <div style={{paddingTop:"20px"}}>      
                <span style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>KDV Oranı:</span>
              <input
                type="number"
                name="tax"
                value={product.tax}
                onChange={handleInputChange}
                className="edit-input-area"
              /></div>
                <hr/>

              <div style={{paddingTop:"20px"}}>
              <span style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>Ürün Rengi:</span>
              <input
                type="text"
                name="color"
                value={product.color}
                onChange={handleInputChange}
                className="edit-input-area"
              /></div>
              <hr/>
          
           
              
       
        
              <div style={{paddingTop:"20px"}}> 
              <span style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>Fiyat:</span>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                className="edit-input-area"
              />
               </div>
               <hr/>

               <div style={{paddingTop:"20px"}}> 
              <span style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>İndirim Oranı:</span>
              <input
                type="number"
                name="discountRate"
                value={product.discountRate}
                onChange={handleInputChange}
                className="edit-input-area"
              />
               </div>
               <hr/>

               <div style={{paddingTop:"20px"}}> 
              <span style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>İndirim Miktarı:</span>
              <input
                type="number"
                name="discountedAmount"
                value={product.discountedAmount}
                onChange={handleInputChange}
                className="edit-input-area"
              />
               </div>
               <hr/>


               <div style={{ paddingTop: "20px" }}>
           <span style={{ fontStyle: "italic", fontFamily: "Times New Roman" }}>Kategori:</span>
           <select
            type="number"
              name="categoryId"
             value={product.categoryId}
              onChange={handleInputChange}
              className="edit-input-area"
            >
              <option value="">Kategori Seçin</option>
              {categories.length === 0 ? (
                <option disabled>Categories is empty</option>
              ) : (
                categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))
              )}
            </select>

           </div>
          
        
         
           
          </div>
          </div>
            <div style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>Açıklaması:</div>
              <textarea
                type="text"
                name="description"
                value={product.description}
                onChange={handleInputChange}
                style={{ padding:"10px", width:"100%" }}
              />
           
       
            <button onClick={handleKaydet} className="save-button" style={{float:"right", marginTop:"30px"}}>Yeni Ürün Ekle</button>
         
        </>
    
  </div>
 


  );

 
}

