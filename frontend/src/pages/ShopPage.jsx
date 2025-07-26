// src/pages/ShopPage.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Zap, Shirt, Puzzle, Coffee } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

// Import our new Cart
import { CartFlyout } from '@/components/CartFlyout'; // Adjust path if needed

// --- MOCK DATA --- (Paste the data from Step 1 here)
const merchandiseData = [
    {
        id: 1,
        name: 'Men\'s Cotton Hoodie',
        category: 'Apparel',
        price: 1299,
        originalPrice: 1999,
        discount: 35,
        image: 'https://veirdo.in/cdn/shop/files/19_4.jpg?v=1729759120&width=533',
        rating: 4.3,
        reviews: 2456,
        tag: 'Best Seller'
    },
    {
        id: 2,
        name: 'Ceramic Coffee Mug (350ml)',
        category: 'Kitchen',
        price: 299,
        originalPrice: 499,
        discount: 40,
        image: 'https://lavalhashop.com/335-home_default/reyna-mug.jpg',
        rating: 4.5,
        reviews: 1892,
        tag: 'New Arrival'
    },
    {
        id: 3,
        name: 'Stainless Steel Water Bottle (1L)',
        category: 'Kitchen',
        price: 499,
        originalPrice: 799,
        discount: 38,
        image: 'https://i.etsystatic.com/12723339/r/il/0ad32c/5728706864/il_fullxfull.5728706864_ne2a.jpg',
        rating: 4.2,
        reviews: 3210,
        tag: 'Limited Edition'
    },
    {
        id: 4,
        name: 'Blue Light Blocking Glasses',
        category: 'Accessories',
        price: 599,
        originalPrice: 999,
        discount: 40,
        image: 'https://cdn-img.prettylittlething.com/6/a/d/2/6ad2318a4cda7c03a835aa7970791cc6bcfd02ea_cmv7457_1.jpg',
        rating: 3.9,
        reviews: 876,
        tag: ''
    },
    {
        id: 5,
        name: 'Men\'s Graphic Printed T-Shirt',
        category: 'Apparel',
        price: 399,
        originalPrice: 799,
        discount: 50,
        image: 'https://m.media-amazon.com/images/I/71S33IJMQoL._UY1100_.jpg',
        rating: 4.1,
        reviews: 4321,
        tag: 'Best Seller'
    },
    {
        id: 6,
        name: 'Stainless Steel Thermos Flask (500ml)',
        category: 'Kitchen',
        price: 799,
        originalPrice: 1299,
        discount: 38,
        image: 'https://engraveit.online/wp-content/uploads/2021/06/LS87-metallic-purple-flask-LSLidOff-1000px.jpg',
        rating: 4.4,
        reviews: 2109,
        tag: ''
    },
    {
        id: 7,
        name: 'Electronic Cleaning Kit',
        category: 'Accessories',
        price: 349,
        originalPrice: 599,
        discount: 42,
        image: 'https://m.media-amazon.com/images/I/71jjfUz5+WL.jpg',
        rating: 4.0,
        reviews: 987,
        tag: 'Hot Pick'
    },
    {
        id: 8,
        name: 'Men\'s Baseball Cap',
        category: 'Apparel',
        price: 249,
        originalPrice: 499,
        discount: 50,
        image: 'https://i.ebayimg.com/images/g/ghIAAOSwJINkYM1E/s-l1200.jpg',
        rating: 3.8,
        reviews: 765,
        tag: ''
    },
    {
        id: 9,
        name: 'Funny Programmer Coffee Mug',
        category: 'Kitchen',
        price: 349,
        originalPrice: 499,
        discount: 30,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTkfeXR4rzXNgNp3fbSUpt5eE3FZeNhm6RHg&s',
        rating: 4.6,
        reviews: 2453,
        tag: ''
    },
    {
        id: 10,
        name: 'Motivational Poster Set (Pack of 6)',
        category: 'Home Decor',
        price: 599,
        originalPrice: 999,
        discount: 40,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToWQQBNE7pLcvjLQPkuiXBvub5hCnYbDRfww&s',
        rating: 4.3,
        reviews: 432,
        tag: 'New Arrival'
    },
    {
        id: 11,
        name: 'Spiral Notebook (Set of 3)',
        category: 'Stationery',
        price: 199,
        originalPrice: 299,
        discount: 33,
        image: 'https://m.media-amazon.com/images/I/61aAFYpaZ1L._UF1000,1000_QL80_.jpg',
        rating: 4.0,
        reviews: 654,
        tag: ''
    },
    {
        id: 12,
        name: 'Insulated Water Bottle (750ml)',
        category: 'Kitchen',
        price: 599,
        originalPrice: 899,
        discount: 33,
        image: 'data:image/jpeg;base64,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',
        rating: 4.5,
        reviews: 5432,
        tag: 'Best Seller'
    },
    {
        id: 13,
        name: 'Laptop Sleeve (15.6 inch)',
        category: 'Accessories',
        price: 499,
        originalPrice: 799,
        discount: 38,
        image: 'data:image/jpeg;base64,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',
        rating: 4.2,
        reviews: 2109,
        tag: ''
    },
    {
        id: 14,
        name: 'Anti Glare Computer Glasses',
        category: 'Accessories',
        price: 799,
        originalPrice: 1299,
        discount: 38,
        image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSExIWFRUVFRUVFhcVFxUXGBYVFxUXFhcWFRYYHSggGBolGxUXITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OFRAQFysZHSE3Ly0tNystLSsrKysxKy0rLS0tKy0tLS0rLS0tKy0tKy0tLS0tLSsrLS0tLTctLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAACBQEGB//EAEIQAAEDAgQDBQQIAwcEAwAAAAEAAhEDIQQSMUEFUWETIjJxgUJSkfAGFHKhscHR4SOS8QczU2KCotIVJLLjQ2OT/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAECAwUE/8QAIxEBAQACAgICAQUAAAAAAAAAAAECEQMxEiEEQRMiYYGhsf/aAAwDAQACEQMRAD8AzAIXVFFpEUUUQRRRRBFFF0IOLoK7C7ZBzMpmXbKWQczKFy7AXDCCqiiiCKKKIIooogiiiiCLq4og7KgK4oghKiihUEUXIUQdBUVKRV1RF1cUQRRRdQcUUUQdXFFEHVxRRBFFFEEUUUAQRRdyrgCgkqImVQtQDJUlEDFAxANclGyrgw5OgJ8hKAcrkoz8I8CS1wHMtIHxVCxBVRWLFTIUHVFzKVxA8eFPGl0u+g4atK1KeIg3NkY4kFVWFCkLbLGOF2oTsAw6GEGVlUyrQfw5w0IKA7DuGoRC2VTKj9muikgXyruVMiku9igWyrmRNikp2aBUNXciaFNTs0C2VTKmezUyIF8q5kTORTIgXyroajZFKrQ1ud5DWmwJ9o8mjVyAWRFw+Fe/wtJjUgWHmdB6rPrcUGlNn+p9/gzT4yksRXfUjtHufFgHGQB0boPRXSvQdjSb/eYim3o053eobp96Lh+L4elPZ1K19crnsn0ET6leZDFZoWplJ9Lv9nrKnE6eJ/h9/NHddUc50HWAS92qzHUoMEQUDhWHDpe55a1kGGtzOMz4RIEAAySbdVV/HjWrkCmKTWnI4uGY29t7z3RsbN00K3Mfyakmr/S2ywz2e65kCJ/1Ci57BTFSu97Q15azxCJysJILnCAQbi2ms9rUixxaQQRzEHncbWOixyYeF1vbNByhRWXVhAqda2Y6TA80w13JZtKvdo5bdURtQyOplBqCoeasakXPokm1y3W/JEpuLiBzv5IpuliTqiiuTqUg99zsG681wP5afNkGgMp1AVnYZh0MJTS55q+Ybz5ICnBHYgobsO4agqzKxF/3TDcYY5oEcqkJ9tQR3gD5ofZsPRApCkJg4bk4H7lR2GePZKIFCkKZSpkQSFKdMuIa0Ek6AIlCgXOyjzM6ADVx5Ac0lxPiwANLDnumz6ujn9Ge6z7z+M39NSfdX4hjGUe6IqVd96dPzI8bugsN50WHWLnuL3OLnHUn5sOgsFxtNEDFQMMVw1FFNWFJECAXQEbslmcY4xTw8t8VT3B7PV528tfxQa2BqlrrEDck6QOY38lsUDTcztmCDOU90NgAQ0gCzZ6RqvldDj9cPzE5s1sux5AAL6b/AGfYerVp1O3bkBMhmhA8tvW/kvp+LMblZl0b0Rq8brUQaGFoBjy3+9ABc6/tFxhg6mdYAFkzB3136kmSfUkn1W/xjhwaJAj5v+vqsfKuXNj45VaXhRHyrq5svOCrkubSV1mOA2zEG3kshwtDjPLUojcSWkCNkVrYfHk6x/RNYbEwQJnMdjqFi4apLiLAXG3xRKGJLcsRLSZ6oNkEnNIvH4FN8PpmLnaeixKWNl4BJvI0F+afwdfuOYTdpLdRcbFA72vemx1ty5mF04iAZ1k6bDmsyjWhxEg+L4wiZrZyRDheTflEbojTpulubabeaITA8o+/olGVQA3MdiTt82hWbUJLXGIILp52cAPuRTA5n08kSnHNZ1B5dfU7zt66aIwqiZmJ0N4aOvM/qgcp1ucFHo4rLpMb/JSLnnKTYWHQSdOqqx556Qfig1TWBNxI6/sEvj8RTptmO8fCJ/HokqeI3Dt+U/eksY12c2kOGYOMABpJAlxgCDI2++6DlSu9wc3NGeMw5xo37Iv6oX1Uj9rqVLQZa4Wu2YnlcAyrMrRoOt7ffzQQUVcU1ZuIvM/Gf0R2kG0fDVEA7NSoWtaXOcGtaJLnGAB1KxuN/SilRllKKlTSZ7jfMjxHoPUjReRdWxOMfll9V0zl0Y3rHhYOqK1+M/SsulmHlo3qGzj9gewOpv8AZWTwng9bEnuDuz3qjpyg739o9B6wvWcJ+hLGjNXPaO1ygwxvQjV3rHkvT06QAAAAAEACwA5ADZBjcH+j9LD3AzP3e7X/AEjRo8viV7H6JiKhHMLKDVq8AltQviwBk/lK6cN1nEelxeGztIjy89F4qtSyuI5Fb2O4w64bE8+nTl89FiOvdb5spfROgMqiLlC6uCvmoqwYGh0P5IoggnltzWLh8daJRqeIPvIHjVBA5j4IweIzE5b6CyRFRsTOiuKoFwdeeqDSZibWsRBvy6brSw2La0ySbtg2m+xAWG2BADbjfWRzRWVpJzG0eXwQar8bL2ucLix/DQaHQp3tmuygd6xaD/mItrrBkLFc09nfV0WGp5EcrKUMSLixJg62F9R1/VBr4zFCbuuGj46X57I/Dqzi0/YLTe5AJkCVj/W7kkA94g+Xuj1HxWtw3heLqkFtJ2QunvgNEQL96J02lTZJb0vRxZg90ANGVsA3kOv5mNVWs9wdPdkQdoAIi2y2RwB1Mg1cRRpAbEzMSAYJABvCyOI06bHNFJ7K7CA1xY6I2EgGx1i+3RJZemrhZ2lTEEty3nU8pN4jlDWq9TF06Udo6Ds0SXOhgghvKTGYwLFI8RwtWlSpvIDTUeGsHtQGuOe5jTnbcpjhHBmZS+rUbTBd3qhPaVHu1hjQbyCLm0QQCCulwuPbEsvRTH8bqspZqVJsTGZ8m507rIa0+bjMKnCKdfEgGq6BmMZixjSQNKdNxAzEG8NnnstTEYnDhwZSZmaIl9aDd13FrToTlg7bQNUnxtjQ0uohjK1Ikw0NAexxk3B7wFwWuOglt5UtmtKtVq5R2YbAa45pnMXRBJnQ2FrLjJO+1/kKnDsUzGQY/jMID22l0bE76EB2+9xCFisa6iyAwOcdXPIZTYZiKj3Qc0z3AM3ksg9WuGtLnkNa2JLrAfnPQXXkONfSF9WadMltK4tZ1QH3t4/y/GVXH4hjznr1nVnDRrAabBe7Wl4zR5NB67rmCx8GaOEaY3DXVDz1cHEWnQjdAPh3CQ6HVndm3ZojO4SBv4Rfe/ReuwOIZTbkpUsrRGg8R0kkeI9TdZdLi2KFzhXWv43MEaaeYTFLjWKJtgQT1qk7Hr0KDbp4ypMClsbwee46jqmG4+oB4NbaO/p/RZWAx+OrHLS4bTcejwQOriTDfWFtYziLMNTIqUqdauQQKeGaCxh5PrviTtDBN/VTa6M4epIlwygRJzRtO4t8xKYq8VYWeMMYORhtrzm3HXpsZC+eca4nXxJp9phHto0zLqbXAmqS4WJAHd7ujRa51K3OJY+lxKmxtNjqRDyK1FpDCxopnK2NS3OB8dogal10j0uCrMrf3L2VelJzXmPssJICuV87dwXCMfHbOp1GXntWS1wNrajnFk/9HfpJUdVdRqPNYjw1LmY8WZ5MubNg517gXlQe1USH17y+K4g+MIjK5Cs6mhligboYyD+RT31sELEhQEhNjZp4i9k8KwdAMEzMkwBzELz+HquLgGguJMAAEknkANVqtLKTpqd54/8AjY6AOlR40PRt+oVk2NbBYerWeGtYXFozEAGI/wAx0aOpIWk3D4OlPb4jOZkUsKA8iPZdVd3B5CV5nFcXqVBBdDB7De6wf6RY+Zk9UAVB8/kmllj1zPpc2kP+zwdKlEjtKk1akfaMQelwkcX9JcVWkvxNQjk05AfRkBYVA2trzRNRyg7C8c/JTxkXyrQwr2kgONp7zzNhNza5hbeIw1QF1NjclNpIfUc6z47wLqhAEFveDWgW1nVeaqSQJET/ALk7Sr1SGjtHENaA0Fzu7tAvsqy0XcPuSavaOpNY2lTeS4NLnFoZTBscuVxPs90CSm8TjnuMkybAAd2wbeBsDeTuQd5WFxXEuYKTz3hLC43EuYS3NIOv8M/zlNl+QAvdkYC675BJiDksXP6hoPXVXK29h2nGlogQZ53EE9CZnS+i18dWptFOs97KbAIcXT/EibMb4nuBzAgcx5HwmJ46B3KLMxuA6o0ExsGUbtER7WbyCXp4GrXcalaoQdCXEl5Ee8bBoETy5BZD1SvQqYj/ALdzmVHWGcAMqE+JpA0DuRsdCBv6XDcUq039ni2CtSdlD3NDXPpF02rNgBzYBiIIiNRC8viWsotyUy0Ei5BJJ0jMdQbk2kTbqW8PiHFlNriXEElsAEtb4XTeHkNgtnQG2pWpZr2A8Sp0qFcuGGim4nI5ru0aTmPgzC1o7ju8CD5LW4dxCnlDwczZvAuNgHcj6Xm3NLvx7mtDMoIl0scMzSCBJymzoLPOSmMLxZ7AOza0EbtBfl10LifIevRQaOH4RiK5cWU4pjxPqkU6YEzdzojZHa/AYYfxKpxdQT/DozTogxMOrES/zYI2Xm8Xj69c/wAR7nkC0nuiAT3GjutkDRo3QabLxzv9xOvJQbuP+mFeq3s2AUKP+FQAY3pmPiceeYkdBdZH1l3L0sP/AB2VqdEEmdhO3PLHz0lFZTGmpgxlFrAmY9DZUJvxbzoBptHS8c/RCqcIfVOdsteLS3KCdr3nSL62W3Qpht4B0AgCxi5HLVMNblnQgT0sIB87jluUHkH/AEarlxDpJg3deSDHzJW7wLgtSiCCYzRmiJOhF+QII/1FehYWNgSPPU2MGLdSdNuS4akWAcSdLNiAPK/meV1BaHe7/u/ZRMfVqnuH4N/RRUfK30kJ1JbVXCpSpQKgy3Ukzwzg9XEPyUx9px8LRzJ/LVbfAPo5Uxb4HdptIzv5T7LRu4/dqev1HhvAadBgaxoAG2t+ZO56r6vj/H/Jd5eo1MbrbxuF4HSwdF74lwYS+ofERFw33W9N95Xzd7p2gbAbL6n/AGj1cmHyixqODfQd4/gvl5Yt/N8cbjhjNSMKNeUZlaELKpC+NTlOvZG7XeZ3jqs5jCSAASTYAXJPIAap0YbJ/evyn3Gw9/rfKz1Mj3UDHakXJ+Nxfptqmp8L6jsgd70gu6saLuHXTmVmDHls5GhvInvuEcie6D1DQfJKueXEkkknUkyT5k6oPUcaqtdhMOWjxOc2TZw7znyADAnL1t8Vl4uhUdUL8waC1hzEgmCxstZOgBkD5C9BVw4+o4YuEhrqbhGpJaSfPxT6JDGcQD7HXIWuiQScxJI5AjUWja0LvzY6v8T/AAK4fBtYMrW98+0ZJIi4Am/3ac0xRIcYDQSA2ARqDfe55ydpiLILaxggNBgRIkGYlxHMWmNtRCXrBzt80m0C8ju7xGnkFwAq7peIIEgbyNBp06bJhmLLZy7m4M5hG4IWa8mTm1m+h1TAYQNIJba8yNLdPmyB5lXKTPebtqBbS3PQTzG6dw9UZdi06ydzbLIvoBpy5hZuEM22JuYu0fl5xz9GafiIHhi5OkGASDsPLrYQgaY5sQdjLSBYtjvN1IkfcJV6Y1bplnzg2cOuotceZS/ZhrgCbg6QPgNZEfCRzuywnnbbcaRAAt5IDU3DWNxE8431AP4+YR8PBMlzb2ubawLRAEHQ8kgXtmCYIsDqSfIWPnvzsnKGJBBAHecI33tBPhHIje0RcECyIbqY52vM/h8COqPSqHchsE3vOsRv8Eu4hsjQi4vLgQdjvYx0tCs2pOWbGBAFjFxB5O/LrJIaIYSMsZXHvQBaecEQBbyErhgZWzMtbadLwQ6LAgnRIVX5tLxEAXIEhokiMxmYNpuOSK7vCb2BDxFwJkQ0W3JOos48wA0+06f7z/wUS8j3n/yj9FEGZVwynDuCOxFUUxYauds1u58+Q5rTfSUwjzSqNeNjfqDr+vorjrc30s1v29vgMNSoNFKk2Gt05k7uJ3J3KbNQQkZAiTEgEdRsfK0TzBQqWLDgSJtIIIggjUEc16/Hcb6xdssv06eA/tSxQdWp0xo1pcfNxAH4FeILF6j6UMdVxVQgE5YHQADVx0Akm5WBUdSZ4n5z7tOI9ap7v8ocvN+RlvkyfOUFOTAEkmABck8gN0R2GDD/ABZB9xpbn6ZpnsxfcE9N1x/EH3DIpg2hkyRyc8kuPlMdEKnhzvbouKiOxroLWAU2mxDJlw5Pee87XSY6IDaRIJAMNAmNpsJ2ElPYHAPq1GUqTZe85WjmeZOwABJOwBKb4vXpsDaNA5qbHGHx/f1oh9cj3B4WDl1c5QYhEW3/AA/dUCN2a0uGcGzt7aq7s6DbuedXX0YN5gifQSbKhvinFZwjaUeBzYj3YytHn3CsMYqdfn9UTiuMa85aYIpgyM3icb953LU2GkrPITLK27vsa9KrtNo9QeY/RSlUyjqReNxu08tPwWSHEIrMQd1Nhp5JbBM326aGd/3TWGeDd21h0Iv98EXWe6sCbfPou06sXP5a6qh/MC8kdecEEzlO/wC/OEycQI8V9YiMsa6bRP7aDOpVdBLoE262OiJTbm0t1OvlE85/dBpUXtADTM7nmCZBBiPWfhddGImx0P8AT7xy63BCRZTuOW+aIEi19pWjhnh8ySLgZiJADYPfgcxGYTIEFp3CwpxY6/CfKfnlrBOzHW1g2vuIiDHTpy05ixUA5bkAaE31MRBPUxPKJ2Ue42dts73j01vO363DYqYgvaATdoGgGUSRGd24NzI32I059YDcozaeLK05YOndkdoCNzadHWCzaTpA0AJmL3FpnfTLbeNZATj3ZPCCfa70ixkWEQDbUiLXuAgZY4jwglo8OpmReTNh5RsbQQjPrSSQSDGkNkgEi5fGWwHQwZvqhTxH+GS2ZsJ7wEzPll2tb2Vym9sgNEx3rxbpMwR5/wBQZh/vt+Lf+C6hf9Ub/gt/k/8AYog9QWqlCmHuLQZIgEDWSJA6WRkqzCVw54woIdXP8R4MOa3LlOV2rQQDcXvzyxvj8ZlPKbIZrY55cGUIqVGwHAl2SmLNDajvejRgk6dJ1H1ezBlsv1JdFzEWDQPvK8Tj8QzBvpupQ7LAq5DLTJyua3L3SQYMgu5SLgeqo1jXbJhto0v969Hg5sc8r5fXUV8t4/jalWq/M4uHaOyt0aLkWaLT1iULDcJqOu7ujrr8P1Xr2cNpsJIbeTc3Ov3eiq+ivMyu7ajAZgGt0HqUN9KFuvw6Y4dhG05xDxmykNo096tc+Fo5gan4mwIUGZiWfVaRpmW1azJrui9HDmCKA/8AsqWzDllb76yKdFz3eElzoa1okkDZo3J/EyV6Kl9Hq1d7qtdwo082d1WtI7SpoS1g7zso7rWgW1MStJ/GqWFaWcPYWuIh2LqgGs4bik24oN+LvIqDFxHBWYRodiYNYgFuHkEgH2qo2HTT7VwMXiWKqVjL3SB4W7N2sPL9BAgBis0kkkkkkklxJJJ1JJuSeZQCxUZ7qKC5i0XMQnU1AgWqpCbfTQnMQBXQ5dLVUhQXa+ExTxPzz80oog0GV7Rr5wLC/wCuyZpVJIuSG3EAkgWGp21ttZZDahCLTr3mfz/FUbTHyNBlmSTzMNAsLG3L4apphJzHRsRFhE2AkzaD1jyF8VmL7pAMS4HTePwMJx+IBgCS6IzTEiPCd+epIPRUMMwu4cLiBeA4TBAcTY2kg9Odq0K0AwdNCQQAYka8wPPS1kOg4EQSA6/c71466g2157HZijkByu2OUaSHAiZAHXWfZEgwEHXNNyfC0A3ib3Jy+zpNtjKsyqSc2s2nceZjUg3nWfOKiwLJ9rQgTDWiTqYGgJ68whVO88lsMHoARG8Wbe0juydQgJ9b+0oluxHJv/6N/VdQfRZUIB1ANiIIBEEQbFclSUQrQ4dSY7M1gnYmTl+zPh9EYy12Zuhs4c0QlVJSWy7gTqMk81Q4c728/wBNVo0QwTmLvJu/mTZDqubs0AeZJ+KDLxGRgzOIA5uIaP39EjiOL1KZy0WjM97aOaGwbEm7bkAdYMyhYjC/WMVlj+HTaxz7aud3m0//ABLvslDx3ZkUGUSSTig5rZJa1lMEPc33WzbkchhFadYF0ZnFxAiTr+yUqUVovCA9qDKqUUq+mtepTS1SkgyX00B7FqVKSXfRPJBnOYhOpp91IoLmHkoEXU0IsTzmITqaBQtVYTLqaoWJoBUVy1VhQcDkVlci3z8EKFEDbK/Ui8iLQeY669bo/byMt45E6ak8pn5nbNXcyuxrUsRBNhBnYQOsabD4W2RS5xiSDsMsTB3+Ji/LUrKZiCPP53RqWIi4sen9UGl9UPvt/lq/ourP+u/5Wff/AMlEH1KVRzlZL132VRDV6rod1WTXrmVahXKK146qZUoysVc1kR5bjfECyvWpYame+2m18BxIcGd8tHUk968zKd+j3DzTbneIeQGgW7lMaN8ybn+qFjeEMe8uyiSZPVXwmB7Pw2HIaKK2uzVTSCFTqlEN1QN9MIT6QTGQqjmIE30ECph0+5hVCxBmPw6XqYdbDqYS9SigyKmHIQXU1q1KSC+igynMVHU1oupKjqKgzHU0I01ommhmkgz3MVS1POpoTqaBQtXEcsVC1NAai6WrkKCSooog+vFyUxD0w9J1ytBNzVdoXV1oQFplFIVKaIoA9muikEUqFUBDFdrVYobiguXKpqKoV+zQCcUJxTDqaE+mgCXKjoRS1ALUA3hBeEw5qG5qBCoEvUYVpupoZpoM7s0MhaJooLqCBMobmJ000PIgSdSQnU1oOYhuYoM9zEMsT76SC6mgUyKJnslEH0yqUlVddHqVEs4qiqK0KjAitYgs1iuuXUMoOqELi6oqrlxrVdcRFSVwlQhVVEzKpViuIBuKE5HKG5AAuVCFZwXIQDc1VyopCkIF300N7Uy5iG4IFsqoaaM6VQoAmkqPoplcKBAtQ3MTdViE5qBbs+i6jZVFB7OohOUUVHWIrVFEFwuqKKK4ooogiiiiCITl1RVFVCooiIqO3XFEUI6oS6og4uD811RBR2qq5cUQDcquXFEA3qqiiAdRCKiiCqiiiD//2Q==',
        rating: 4.1,
        reviews: 3210,
        tag: 'Limited Edition'
    },
    {
        id: 15,
        name: 'Large Gaming Mouse Pad (900x400mm)',
        category: 'Accessories',
        price: 399,
        originalPrice: 699,
        discount: 43,
        image: 'https://www.masioriginals.com/cdn/shop/files/1_456938e7-c3c5-480b-9996-1da623141e4a.jpg?v=1742485848&width=1946',
        rating: 4.4,
        reviews: 5432,
        tag: 'Hot Pick'
    },
    {
        id: 16,
        name: 'Men\'s Pullover Hoodie',
        category: 'Apparel',
        price: 899,
        originalPrice: 1499,
        discount: 40,
        image: 'https://i5.walmartimages.com/seo/Winter-Purple-Hoodies-For-Men-Mens-Autumn-And-Casual-Loose-Solid-Hooded-Sweater-Top-Polyester_d4221bbb-75f8-42dd-a22a-474a557f7c6c.0ee855cf3f6cf80d72868c85a5d7041c.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF',
        rating: 4.0,
        reviews: 1234,
        tag: ''
    },
    {
        id: 17,
        name: 'Vacuum Insulated Tumbler (500ml)',
        category: 'Kitchen',
        price: 699,
        originalPrice: 999,
        discount: 30,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCrOpulh0J3DriPtS0fal-IkytjiaFxzBUhQ&s',
        rating: 4.3,
        reviews: 2876,
        tag: ''
    },
    {
        id: 18,
        name: 'Stainless Steel Flask (450ml)',
        category: 'Kitchen',
        price: 649,
        originalPrice: 1099,
        discount: 41,
        image: 'data:image/jpeg;base64,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',
        rating: 4.6,
        reviews: 4987,
        tag: 'Best Seller'
    },
    {
        id: 19,
        name: 'Men\'s Casual T-Shirt (Pack of 3)',
        category: 'Apparel',
        price: 799,
        originalPrice: 1299,
        discount: 38,
        image: 'https://i.pinimg.com/236x/47/bb/21/47bb21eafe992bfacf312eb1fda7ed86.jpg',
        rating: 4.2,
        reviews: 5432,
        tag: ''
    },
    {
        id: 20,
        name: 'Leather Journal Notebook',
        category: 'Stationery',
        price: 449,
        originalPrice: 799,
        discount: 44,
        image: 'https://dmleatherstudio.com/cdn/shop/products/personalized-vintage-purple-leather-notebook-cover-842738_1024x1024.jpg?v=1696127842',
        rating: 4.5,
        reviews: 876,
        tag: 'New Arrival'
    }
];

const categories = ['All', ...new Set(merchandiseData.map(item => item.category))];
const categoryIcons = {
    'All': <Puzzle size={18} />,
    'Apparel': <Shirt size={18} />,
    'Accessories': <Zap size={18} />,
    'Workspace': <Coffee size={18} />
};


// Reusable Product Card Component
const ProductCard = ({ item, onAddToCart }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="relative group overflow-hidden rounded-xl bg-black/40 border border-white/10 backdrop-blur-lg shadow-lg"
    >
        {item.tag && (<div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md flex items-center gap-1"><Zap className="w-3 h-3" />{item.tag}</div>)}
        <div className="overflow-hidden"><img src={item.image} alt={item.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" /></div>
        <div className="px-5">
            <p className="text-sm text-purple-400 font-medium">{item.category}</p>
            <h3 className="text-xl font-bold text-white mt-1 truncate">{item.name}</h3>
            <div className="flex justify-between items-center mt-4">
                <p className="text-2xl font-semibold text-white">₹{item.price.toLocaleString('en-IN')}</p>
                <button onClick={() => onAddToCart(item)} className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors border border-white/20">
                    <ShoppingBag className="w-5 h-5" /><span>Cart</span>
                </button>
            </div>
        </div>
    </motion.div>
);

// --- Main Shop Page Component ---
const ShopPage = () => {
    // State for cart management
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // State for filtering
    const [activeCategory, setActiveCategory] = useState('All');
    const [filteredItems, setFilteredItems] = useState(merchandiseData);

    useEffect(() => {
        if (activeCategory === 'All') {
            setFilteredItems(merchandiseData);
        } else {
            setFilteredItems(merchandiseData.filter(item => item.category === activeCategory));
        }
    }, [activeCategory]);

    // Cart logic
    const handleAddToCart = (item) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map(cartItem => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem);
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });

        toast.success(`${item.name} added to cart!`, {
            icon: '🛒',
            style: { background: '#1a1a2e', color: '#e0e0e0', border: '1px solid rgba(255, 255, 255, 0.1)' }
        });
    };

    const handleUpdateQuantity = (id, quantity) => {
        if (quantity < 1) {
            handleRemoveFromCart(id);
            return;
        }
        setCart(prevCart => prevCart.map(item => item.id === id ? { ...item, quantity } : item));
    };

    const handleRemoveFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <div className="relative min-h-screen w-full bg-gray-900 text-white font-sans overflow-x-hidden">
            {/* --- Background Decorations --- */}
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000"></div>
                <div className="absolute -bottom-8 right-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-1000"></div>
            </div>

            <div className="absolute inset-0 z-0 bg-[radial-gradient(#ffffff1a_1px,transparent_1px)] [background-size:2rem_2rem]"></div>

            <Toaster position="bottom-right" />
            <Navbar />
            <CartFlyout isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} onUpdateQuantity={handleUpdateQuantity} onRemoveFromCart={handleRemoveFromCart} />

            {/* Floating Cart Button */}
            <motion.button
                onClick={() => setIsCartOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-8 right-8 z-30 flex items-center gap-3 h-14 pl-6 pr-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl shadow-purple-500/30"
            >
                <ShoppingBag />
                <span className="font-bold">View Cart</span>
                {cartItemCount > 0 &&
                    <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-purple-600 text-xs font-bold">{cartItemCount}</span>
                }
            </motion.button>

            <main className="relative z-10 pt-24 md:pt-32 pb-20 mb-[40vh]">
                <section className="text-center px-4">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-7xl font-extrabold tracking-tighter">
                        The CodeHunter <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-transparent bg-clip-text"> Armory</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-4 max-w-2xl mx-auto text-lg text-white/70">
                        Exclusive gear for the modern-day digital warrior. Stand out while you code.
                    </motion.p>
                </section>

                {/* --- Animated Filter Buttons --- */}
                <div className="flex justify-center my-12 px-4">
                    <div className="flex space-x-2 p-1.5 rounded-full bg-black/30 border border-white/10">
                        {categories.map((cat) => (
                            <button key={cat} onClick={() => setActiveCategory(cat)} className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat ? 'text-white' : 'text-white/60 hover:text-white'}`}>
                                {activeCategory === cat && (
                                    <motion.div layoutId="activePill" className="absolute inset-0 bg-white/10 rounded-full" style={{ borderRadius: 9999 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                                )}
                                <span className="relative z-10">{categoryIcons[cat]}</span>
                                <span className="relative z-10">{cat}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- Collection Grid with Animation --- */}
                <section>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            <AnimatePresence>
                                {filteredItems.map(item => (
                                    <ProductCard key={item.id} item={item} onAddToCart={handleAddToCart} />
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <style>{`
         @keyframes blob {
           0% { transform: translate(0px, 0px) scale(1); }
           33% { transform: translate(30px, -50px) scale(1.1); }
           66% { transform: translate(-20px, 20px) scale(0.9); }
           100% { transform: translate(0px, 0px) scale(1); }
         }
         .animate-blob {
           animation: blob 7s infinite;
         }
         .animation-delay-2000 {
           animation-delay: 2s;
         }
         .animation-delay-4000 {
           animation-delay: 4s;
         }
       `}</style>
        </div>
    );
};

export default ShopPage;