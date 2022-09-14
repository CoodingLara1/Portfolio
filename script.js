/*===== Resize Navbar on Scroll =====*/

var navbar = document.querySelector('.navbar');
var btnUp = document.querySelector(".btn-up");
console.log(btnUp)

// When The Scroll Is Higher Than 20 Viewport Height, Add The Sticky Class To The Tag With A Class Navbar
window.onscroll = () => {
    if (this.scrollY > 20) 
    {
        navbar.classList.add('sticky'); 
        btnUp.style.display = "block";
    } else {
         btnUp.style.display = "none";
        navbar.classList.remove('sticky');
     }
    
}
/* ===== Nav Toggler ===== */
const navMenu = document.querySelector(".menu");
navToggler = document.querySelector(".menu-btn");
if (navToggler) 
{
    navToggler.addEventListener("click", () => 
    {
        navMenu.classList.toggle("active")
    })
}
// Closing menu when link is clicked
const navlink = document.querySelectorAll(".nav-link");
function linkActive()
{
    const navMenu = document.querySelector(".menu");
    navMenu.classList.remove("active");
}
navlink.forEach(n => n.addEventListener("click", linkActive));
/* ===== Scroll Section Active ===== */

const section = document.querySelectorAll("section[id]")
function scrollActive() 
{
    const scrollY = window.pageYOffset;
    section.forEach(current => 
        {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 50;
            const sectionId = current.getAttribute('id');
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight)
            {
                document.querySelector('.links a[href*=' + sectionId + ']').classList.add('active');
            }
            else
            {
                document.querySelector('.links a[href*=' + sectionId + ']').classList.remove('active');
            }
        })
}
window.addEventListener('scroll', scrollActive)
/*===== Skills Animation =====*/

const skills_wrap = document.querySelector(".about-skills"),
    skills_bar = document.querySelectorAll(".progress-line");
    window.addEventListener("scroll", () => {
        skillsEffect();
    });
    // every time we scroll checking, we exceeded the about-skills or not
    function checkScroll(el) {
        // getting the top position of about-skills relative to view port, in other words we need to get
        // amount of pixels between about-skills and the top edge of the window.
        let rect = el.getBoundingClientRect();
        // after knowing the amount of pixels between the top edge of about skills and the top edge of window
        // now we will check we exceeded the bottom edge of about skills or not
        if (window.innerHeight >= rect.top + el.offsetHeight) return true;
        return false;
    }
    function skillsEffect() {
        if (!checkScroll(skills_wrap)) return;
        skills_bar.forEach((skill) => (skill.style.width = skill.dataset.progress));
    }


    /* ===== Portfolio Item Filter ===== */
    const FilterContainer = document.querySelector(".portfolio-filter"),
            filterBtns = FilterContainer.children;
            totalFilterBtn = filterBtns.length;

            PortfolioItems = document.querySelectorAll(".portfolio-item"),
            totalPortfolioItem = PortfolioItems.length;

            for (let i = 0; i < totalFilterBtn; i++) 
            {
                filterBtns[i].addEventListener("click", function() 
                {
                    FilterContainer.querySelector(".active").classList.remove("active");
                    this.classList.add("active");
                    const filterValue = this.getAttribute("data-filter");

                    for (let k = 0; k < totalPortfolioItem; k++) 
                    {
                        if (filterValue === PortfolioItems[k].getAttribute("data-category")) 
                        {
                            PortfolioItems[k].classList.remove("hide");
                            PortfolioItems[k].classList.add("show");
                        } 
                        else 
                        {
                            PortfolioItems[k].classList.remove("show");
                            PortfolioItems[k].classList.add("hide");
                        }
                        if (filterValue === "all-project") {
                            PortfolioItems[k].classList.remove("hide");
                            PortfolioItems[k].classList.add("show");
                        }
                    }
                });
            }
            /* ===== Lightbox ==== */
            // const url = ["","https://coodinglara1.github.io/Product-preview-card-component/", "https://coodinglara1.github.io/projectQR-Code/", "https://coodinglara1.github.io/pc/"]
            const icon = document.querySelectorAll(".icon");
            console.log(icon);
            const lightbox =document.querySelector(".lightbox"),
                    lightboxImg = lightbox.querySelector(".lightbox-img"),
                    lightboxClose = lightbox.querySelector(".lightbox-close"),
                    lightboxText = lightbox.querySelector(".caption-text"),
                    lightboxCounter = lightbox.querySelector(".caption-counter");
                    let itemIndex = 0;

                    for (let i = 0; i < totalPortfolioItem; i++) 
                    {
                        PortfolioItems[i].addEventListener("click", function() 
                        {
                            if (PortfolioItems[i] === icon[i]) {
                                console.log("f")
                            }
                            itemIndex = i;
                            changeItem();
                            toggleLightbox();
                        });
                    };
                    function nextItem()
                    {
                        if (itemIndex == totalPortfolioItem - 1)
                        {
                            itemIndex = 0;
                        }
                        else
                        {
                            itemIndex++;
                        }
                        changeItem();
                    }
                    function prevItem()
                    {
                        if (itemIndex == 0)
                        {
                            itemIndex = totalPortfolioItem - 1;
                        }
                        else
                        {
                            itemIndex--;
                        }
                        changeItem();
                    }
                    function toggleLightbox() 
                    {
                        lightbox.classList.toggle("open")
                    }
                    function changeItem()
                    {
                        imgSrc = PortfolioItems[itemIndex].querySelector(".portfolio-img img").getAttribute("src");
                        lightboxImg.src = imgSrc;
                        lightboxText.innerHTML = PortfolioItems[itemIndex].querySelector("h4").innerHTML;
                        lightboxCounter.innerHTML = (itemIndex + 1) + " of " + totalPortfolioItem;
                    }
                    /* ===== Close Lightbox ===== */
                    lightbox.addEventListener("click", function(event) 
                    {
                        if (event.target === lightboxClose || event.target === lightbox)
                        {
                            toggleLightbox();
                        }
                    })