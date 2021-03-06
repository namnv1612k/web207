import React, {useState, useEffect} from 'react'
import {useParams, useHistory, Link} from 'react-router-dom'
import CurrencyFormat from 'react-currency-format'
import httpProduct from "../../../../api/productApi"
import httpCategory from "../../../../api/categoryApi"
import httpAlbum from "../../../../api/albumApi"
import Axios from 'axios'
import CART from '../../../../cart/index'

const DetailProduct = ({setCategory, product, setProduct, category, cart, setCart}) => {
  const History = useHistory();

  let {id} = useParams()
  // If without 'id'
  if (!id) {
    History.push('/404-not-found')
  }

  const [albums, setAlbums] = useState([])

  useEffect(() => {
    try {
      // trying to use new API - https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
      window.scroll({
        top: 0,
        left: 0,
        // behavior: 'smooth',
      });
    } catch (error) {
      // just a fallback for older browsers
      window.scrollTo(0, 0);
    }
  }, []);

  // Get data product
  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await httpProduct.get(id);
        setProduct(data);
        getCategory(data.cate_id);
      } catch (error) {
        History.push('/404-not-found')
      }
    }
    getProduct()
  }, [])

  useEffect(() => {
    const getAlbum = async () => {
      try {
        await Axios.get(`http://localhost:8080/albums?product_id=${id}`)
          .then(({data}) => {
            setAlbums(data) 
          })
      } catch (error) {
        // setAlbums([])
      }
    }
    getAlbum()
  }, [])

  // Get category
  const getCategory = async (cate_id) => {
    try {
      const { data } = await httpCategory.get(cate_id);
      setCategory(data)
    } catch (error) {
      setCategory({})
    }
  }

  // Add cart
  // const addCart = (id) => {
  //   CART.add(id)
  // }

  const {name, image, price, intro,  desc, sale_price} = product

  // const albumProduct = albums
  // console.log(albums)

  return (
    <div>
      <div className="breadcrumbs-container">
        <div className="container">
            <div className="row">
              <div className="col-sm-12">
                  <nav className="woocommerce-breadcrumb">
                      <Link to="/">Home</Link>
                      <span className="separator">/</span>
                      <Link to="/shop">Shop</Link>
                      <span className="separator">/</span>
                      <Link to={`/shop?categor=${category.id}`}>{category.name}</Link>
                      <span className="separator">/</span> {product.name}
                  </nav>
              </div>
              </div>
          </div>
      </div>
      <div className="entry-header">
        <div className="container">
            <div className="row">
              <div className="col-sm-12">
                  <h1 className="entry-title">{product.name}</h1>
              </div>
              </div>
          </div>
      </div>
      {/* Single product area */}
      <div className="single-product-area">
        <div className="container">
          <div className="single-product-wrapper">
            <div className="row">
              <div className="col-xs-12 col-md-7 col-lg-7">
                <div className="product-details-img-content">
                  <div className="product-details-tab mr-40">
                    <div className="product-details-large tab-content">

                      <div className="tab-pane active" id="pro-details1">
                        <div className="product-popup">
                          <a href={image}>
                            <img src={image} alt="" />
                          </a>
                        </div>
                      </div>
                      {albums.map((album, key) => ( 
                        <div className="tab-pane" key={key} id={`pro-details${key+2}`}>
                          <div className="product-popup">
                            <a href={album.image}>
                              <img src={album.image} alt="" />
                            </a>
                          </div>
                        </div>
                      ))}
                      
                    </div>
                    <div className="product-details-small nav product-dec-slider owl-carousel">
                      <a className="active" href="#pro-details1">
                        <img src={image} alt="" />
                      </a>

                      {albums.map((album, key) => (
                        <a key={key} href={`#pro-details${key+2}`}>
                          <img src={album.image} alt="" />
                        </a>
                      ))}
  
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-md-5 col-lg-5">
                <div className="single-product-info">
                  <h1>{name}</h1>
                  <div className="product-rattings">
                    <span><i className="fa fa-star" /></span>
                    <span><i className="fa fa-star" /></span>
                    <span><i className="fa fa-star" /></span>
                    <span><i className="fa fa-star-half-o" /></span>
                    <span><i className="fa fa-star-o" /></span>
                  </div>
                  <span className="price">
                    <del><CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'₫'} /></del> <CurrencyFormat value={sale_price} displayType={'text'} thousandSeparator={true} prefix={'₫'} />
                  </span>
                  <div dangerouslySetInnerHTML={{__html: intro}}></div>
                  <div className="box-quantity d-flex">
                    <form action="#">
                      <input className="quantity mr-40" min={1} defaultValue={1} type="number" />
                    </form>
                    <button className="add-cart btn" onClick={CART.add(id)}>add to cart</button>
                  </div>
                  <div className="wishlist-compear-area">
                    <a href="wishlist.html"><i className="ion-ios-heart-outline" /> Add to Wishlist</a>
                    <a href="#"><i className="ion-ios-loop-strong" /> Compare</a>
                  </div>
                  <div className="product_meta">
                    <span className="posted_in">Categories: <Link to={`/category/${category.id}`} rel="tag">{category.name}</Link></span>
                  </div>
                  <div className="single-product-sharing">
                    <div className="widget widget_socialsharing_widget">
                      <h3 className="widget-title">Share this product</h3>
                      <ul className="social-icons">
                        <li><a className="facebook social-icon" href="#"><i className="fa fa-facebook" /></a></li>
                        <li><a className="twitter social-icon" href="#"><i className="fa fa-twitter" /></a></li>
                        <li><a className="pinterest social-icon" href="#"><i className="fa fa-pinterest" /></a></li>
                        <li><a className="gplus social-icon" href="#"><i className="fa fa-google-plus" /></a></li>
                        <li><a className="linkedin social-icon" href="#"><i className="fa fa-linkedin" /></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Single product area end */}
      {/* product description */}
      <div className="product-description-area">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <ul className="nav nav-tabs">
                <li className="active">
                  <a data-toggle="tab" href="#description">Description</a>
                </li>
                <li>
                  <a data-toggle="tab" href="#reviews">Reviews 1</a>
                </li>
              </ul>
              <div className="tab-content">
                <div id="description" className="tab-pane fade in show active">
                  <h2>Description</h2>
                  <div dangerouslySetInnerHTML={{__html: desc}}></div>
                </div>
                <div id="reviews" className="tab-pane fade product-review-area">
                  <h3>1 REVIEW FOR SIT VOLUPTATEM</h3>
                  <ol className="commentlist">
                    <li>
                      <div className="single-comment">
                        <div className="comment-avatar">
                          <img src="images/blog/road-avatar.jpg" alt="comment image bege" />
                        </div>
                        <div className="comment-info">
                          <div className="product-rattings">
                            <span><i className="fa fa-star" /></span>
                            <span><i className="fa fa-star" /></span>
                            <span><i className="fa fa-star" /></span>
                            <span><i className="fa fa-star-half-o" /></span>
                            <span><i className="fa fa-star-o" /></span>
                          </div>
                          <span className="date"><strong>admin</strong> October 6, 2014 at 1:38 am</span>
                          <p>Good product</p>
                        </div>
                      </div>
                    </li>
                  </ol>
                  <div className="comment-respond">
                    <p>Add a review</p>
                    <p>Your email address will not be published. Required fields are marked *</p>
                    <p>Your rating</p>
                    <div className="product-rattings">
                      <span><i className="fa fa-star" /></span>
                      <span><i className="fa fa-star" /></span>
                      <span><i className="fa fa-star" /></span>
                      <span><i className="fa fa-star-half-o" /></span>
                      <span><i className="fa fa-star-o" /></span>
                    </div>
                    <form action="#">
                      <div className="text-filds">
                        <label htmlFor="comment">Your review <span className="required">*</span></label>
                        <textarea id="comment" name="comment" cols={45} rows={8} maxLength={65525} required="required" defaultValue={""} />
                      </div>
                      <div className="comment-input">
                        <p className="comment-form-author">
                          <label htmlFor="author">Name <span className="required">*</span></label> 
                          <input id="author" name="author" type="text" defaultValue size={30} maxLength={245} required="required" />
                        </p>
                        <p className="comment-form-email">
                          <label htmlFor="email">Email <span className="required">*</span></label> 
                          <input id="email" name="email" type="text" defaultValue size={30} maxLength={100} aria-describedby="email-notes" required="required" />
                        </p>
                        <p className="comment-form-url">
                          <label htmlFor="url">Website</label> 
                          <input id="url" name="url" type="text" defaultValue size={30} maxLength={200} />
                        </p>
                      </div>
                      <div className="form-submit">
                        <input name="submit" type="submit" id="submit" className="submit" defaultValue="Submit" />
                      </div>
                    </form>
                  </div>
                </div>
              </div> 
            </div>
          </div>
        </div>
      </div>
      {/* product description end */}
      {/* Single related product */}
      <div className="single-related-product-area">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="section-title">
                <h3>Related products</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="related-product">
              <div className="single-product-area">
                <div className="product-wrapper gridview">
                  <div className="list-col4">
                    <div className="product-image">
                      <a href="#">
                        <img src="images/product/9.jpg" alt="" />
                      </a>
                      <div className="quickviewbtn">
                        <a href="#" data-toggle="modal" data-target="#product_modal" data-original-title="Quick View"><i className="ion-eye" /></a>
                      </div>
                    </div>
                  </div>
                  <div className="list-col8">
                    <div className="product-info">
                      <h2><a href="single-product.html">Auctor gravida enim</a></h2>
                      <span className="price">
                        <del>$ 85.00</del> $ 75.00
                      </span>
                    </div>
                    <div className="product-hidden">
                      <div className="add-to-cart">
                        <a href="cart.html">Add to cart</a>
                      </div>
                      <div className="star-actions">
                        <div className="product-rattings">
                          <span><i className="fa fa-star" /></span>
                          <span><i className="fa fa-star" /></span>
                          <span><i className="fa fa-star" /></span>
                          <span><i className="fa fa-star-half-o" /></span>
                          <span><i className="fa fa-star-o" /></span>
                        </div>
                        <ul className="actions">
                          <li><a href="#"><i className="ion-android-favorite-outline" /></a></li>
                          <li><a href="#"><i className="ion-ios-shuffle-strong" /></a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="related-product">
              <div className="single-product-area">
                <div className="product-wrapper gridview">
                  <div className="list-col4">
                    <div className="product-image">
                      <a href="#">
                        <img src="images/product/5.jpg" alt="" />
                      </a>
                      <div className="quickviewbtn">
                        <a href="#" data-toggle="modal" data-target="#product_modal" data-original-title="Quick View"><i className="ion-eye" /></a>
                      </div>
                    </div>
                  </div>
                  <div className="list-col8">
                    <div className="product-info">
                      <h2><a href="single-product.html">Donec eu libero</a></h2>
                      <span className="price">
                        <del>$ 77.00</del> $ 66.00
                      </span>
                    </div>
                    <div className="product-hidden">
                      <div className="add-to-cart">
                        <a href="cart.html">Add to cart</a>
                      </div>
                      <div className="star-actions">
                        <div className="product-rattings">
                          <span><i className="fa fa-star" /></span>
                          <span><i className="fa fa-star" /></span>
                          <span><i className="fa fa-star" /></span>
                          <span><i className="fa fa-star-half-o" /></span>
                          <span><i className="fa fa-star-o" /></span>
                        </div>
                        <ul className="actions">
                          <li><a href="#"><i className="ion-android-favorite-outline" /></a></li>
                          <li><a href="#"><i className="ion-ios-shuffle-strong" /></a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="related-product">
              <div className="single-product-area">
                <div className="product-wrapper gridview">
                  <div className="list-col4">
                    <div className="product-image">
                      <a href="#">
                        <img src="images/product/6.jpg" alt="" />
                      </a>
                      <div className="quickviewbtn">
                        <a href="#" data-toggle="modal" data-target="#product_modal" data-original-title="Quick View"><i className="ion-eye" /></a>
                      </div>
                    </div>
                  </div>
                  <div className="list-col8">
                    <div className="product-info">
                      <h2><a href="single-product.html">Pellentesque posuere</a></h2>
                      <span className="price">
                        $ 45.00
                      </span>
                    </div>
                    <div className="product-hidden">
                      <div className="add-to-cart">
                        <a href="cart.html">Add to cart</a>
                      </div>
                      <div className="star-actions">
                        <div className="product-rattings">
                          <span><i className="fa fa-star" /></span>
                          <span><i className="fa fa-star" /></span>
                          <span><i className="fa fa-star" /></span>
                          <span><i className="fa fa-star-half-o" /></span>
                          <span><i className="fa fa-star-o" /></span>
                        </div>
                        <ul className="actions">
                          <li><a href="#"><i className="ion-android-favorite-outline" /></a></li>
                          <li><a href="#"><i className="ion-ios-shuffle-strong" /></a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="related-product">
              <div className="single-product-area">
                <div className="product-wrapper gridview">
                  <div className="list-col4">
                    <div className="product-image">
                      <a href="#">
                        <img src="images/product/7.jpg" alt="" />
                      </a>
                      <div className="quickviewbtn">
                        <a href="#" data-toggle="modal" data-target="#product_modal" data-original-title="Quick View"><i className="ion-eye" /></a>
                      </div>
                    </div>
                  </div>
                  <div className="list-col8">
                    <div className="product-info">
                      <h2><a href="single-product.html">Cras neque metus</a></h2>
                      <span className="price">
                        $ 70.00
                      </span>
                    </div>
                    <div className="product-hidden">
                      <div className="add-to-cart">
                        <a href="cart.html">Add to cart</a>
                      </div>
                      <div className="star-actions">
                        <div className="product-rattings">
                          <span><i className="fa fa-star" /></span>
                          <span><i className="fa fa-star" /></span>
                          <span><i className="fa fa-star" /></span>
                          <span><i className="fa fa-star-half-o" /></span>
                          <span><i className="fa fa-star-o" /></span>
                        </div>
                        <ul className="actions">
                          <li><a href="#"><i className="ion-android-favorite-outline" /></a></li>
                          <li><a href="#"><i className="ion-ios-shuffle-strong" /></a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="related-product">
              <div className="single-product-area">
                <div className="product-wrapper gridview">
                  <div className="list-col4">
                    <div className="product-image">
                      <a href="#">
                        <img src="images/product/1.jpg" alt="" />
                      </a>
                      <div className="quickviewbtn">
                        <a href="#" data-toggle="modal" data-target="#product_modal" data-original-title="Quick View"><i className="ion-eye" /></a>
                      </div>
                    </div>
                  </div>
                  <div className="list-col8">
                    <div className="product-info">
                      <h2><a href="single-product.html">Aliquam lobortis est</a></h2>
                      <span className="price">
                        $ 80.00
                      </span>
                    </div>
                    <div className="product-hidden">
                      <div className="add-to-cart">
                        <a href="cart.html">Add to cart</a>
                      </div>
                      <div className="star-actions">
                        <div className="product-rattings">
                          <span><i className="fa fa-star" /></span>
                          <span><i className="fa fa-star" /></span>
                          <span><i className="fa fa-star" /></span>
                          <span><i className="fa fa-star-half-o" /></span>
                          <span><i className="fa fa-star-o" /></span>
                        </div>
                        <ul className="actions">
                          <li><a href="#"><i className="ion-android-favorite-outline" /></a></li>
                          <li><a href="#"><i className="ion-ios-shuffle-strong" /></a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

DetailProduct.propTypes = {

}

export default DetailProduct
