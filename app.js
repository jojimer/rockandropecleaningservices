const projects = {
    cleaningServices: {
        service_name: "Cleaning Services",
        img: [
            { folder_name: "alphaland", images: ["1.jpg","2.jpg","3.jpg","4.jpg"] },
            { folder_name: "Araneta", images: ["1.jpg","2.jpg","3.jpg"] },
            { folder_name: "Bellevue", images: ["1.jpg","2.jpg","3.webp","4.webp"] },
            { folder_name: "CrimsonEntrata", images: ["1.webp","2.webp","3.webp","4.webp"] },
            { folder_name: "DLS_Benilde", images: ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg","10.jpg","11.jpg","12.jpg","13.jpg","14.jpg","15.jpg"] },
            { folder_name: "Gateway", images: ["1.jpg","2.jpg","3.jpg","4.webp"] },
            { folder_name: "Manulife", images: ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg"] },
            { folder_name: "MedicalCity", images: ["1.webp","2.webp","3.jpg","4.webp","5.jpg"] },
            { folder_name: "RCBC_BGC", images: ["1.jpg","2.jpg","3.jpg","4.jpg"] },
            { folder_name: "SM_Aura", images: ["1.webp","2.jpg","3.jpg"] }
        ]
    },
    paintAndSealantJob: {
        service_name: "Paint And Sealant Job",
        img: [
            { folder_name: "bgc_project", images: ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg","10.jpg","11.jpg","12.jpg","13.jpg","14.jpg"] },
            { folder_name: "davao_project", images: ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg"] },
        ]
    },
    repairAndMaintenance: {
        service_name: "Repair And Maintenance",
        img: [
            { folder_name: "rockwell_project", images: ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg"] },
        ]
    },
    rectificationWorks: {
        service_name: "Rectification Works",
        img: [
            { folder_name: "highStreetBGC", images: ["1.jpg","2.jpg","3.jpg"] },
            { folder_name: "picadillyStar", images: ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg"] },
        ]
    },
    buildingInspection: {
        service_name: "Building Inspection",
        img: [
            { folder_name: "waterLeakTest", images: ["1.jpg","2.jpg","3.jpg"] },
        ]
    }
}

// Get All Project Keys
const projectKey = Object.keys(projects).map(key => key);
const galleries = document.getElementById('galleries');
const gallerySelector = document.getElementById('project_filter');
const style = "linear-gradient( to bottom right,rgba(255,127,36, 0.2) 20%, rgba(92,57,19, 0.2)),";
const initGallery = (e) => {
    const i = e.target.getAttribute("data-index");
    const key = e.target.getAttribute("data-project");
    const project = projects[key].img[i];
    const src = `./img/${key}/${project.folder_name}/`;
    let images = "";
    $('.gallery-image-lightbox').fadeIn(300);
    $('.gallery-image-lightbox').addClass('active');
    $('.gallery-image-lightbox .img-container').append('<img class="single-img" src="' + src+project.images[0]+ '" alt="' + project.folder_name + '" />');
    $('.filter').css('background-image', 'url(' + src+project.images[0]+ ')');
    project.images.map((img,index) => {
        const active = (index == 0) ? "active" : "";
        images+= '<img class="img-list-choices '+active+'" src="' + src+img + '" alt="' + project.folder_name + '" />';
    });
    $('.img-list').append(images);
    $('html').css('overflow', 'hidden');
    $('.arrowr').css('display', 'block');
    $('.arrowl').css('display', 'none');
}

const changeGallery = (key) => {
    $('.our_projects-gallery').fadeOut(1);
    $(`.our_projects-gallery[data-project=${key}]`).fadeIn(750);
}

const moveRight = () => {
    let imgSrc = $('.gallery-image-lightbox .img-container img').attr('src');
    let search = $('.img-list').find('img[src$="' + imgSrc + '"]');
    let newImage = search.next().attr('src');
    search.removeClass('active');
    search.next().addClass('active');
    
    $('.gallery-image-lightbox .img-container img').attr('src', newImage);
    $('.filter').css('background-image', 'url(' + newImage + ')');

    if (!search.next().is(':last-child')) {
        $('.arrowl').css('display', 'block');
    } else {
        $('.arrowr').css('display', 'none');
    }
}

const moveLeft = () => {
    let imgSrc = $('.gallery-image-lightbox .img-container img').attr('src');
    let search = $('.img-list').find('img[src$="' + imgSrc + '"]');
    let newImage = search.prev().attr('src');
    search.removeClass('active');
    search.prev().addClass('active');

    $('.gallery-image-lightbox .img-container img').attr('src', newImage);
    $('.filter').css('background-image', 'url(' + newImage + ')');

    if (!search.prev().is(':first-child')) {
        $('.arrowr').css('display', 'block');
    } else {
        $('.arrowl').css('display', 'none');
    }
}

// Create Gallery Preview
projectKey.map((key,i) => {
    projects[key].img.map((v,index) => {
        const galleryElement = document.createElement('div');
        const src = `./img/${key}/${v.folder_name}/${v.images[0]}`;
        galleryElement.classList = "our_projects-gallery";
        galleryElement.setAttribute('data-index',index);
        galleryElement.setAttribute('data-project',key);
        if(i !== 0) galleryElement.style.display = "none";
        galleryElement.style.backgroundImage = style+` url(${src})`;
        galleryElement.addEventListener('click',initGallery);
        galleries.appendChild(galleryElement);
    })

    const optionElement = document.createElement('option');
    optionElement.setAttribute('value',key);
    optionElement.innerHTML = projects[key].service_name;    
    gallerySelector.appendChild(optionElement);
});

//gallerySelector.addEventListener('change',changeGallery);
$(document).on('change','#project_filter',function(){
    changeGallery(this.value);
});

// Gallery Script
$(document).on('click','.gallery-image-lightbox .close',function() {
    $('.gallery-image-lightbox').fadeOut(300);
    $('.gallery-image-lightbox').removeClass('active');
    $('.gallery-image-lightbox img').remove();
    $('html').css('overflow', 'auto');
});

$(document).keyup(function(e) {
    if($('.gallery-image-lightbox').hasClass('active')){
        if (e.keyCode == 27) {
            $('.gallery-image-lightbox').fadeOut(300);
            $('.gallery-image-lightbox img').remove();
            $('.gallery-image-lightbox').removeClass('active');
            $('html').css('overflow', 'auto');
        }else if(e.keyCode == 39){ // right
            moveRight();
        }else if(e.keyCode == 37){ // left
            moveLeft();
        }
    }    
});

$(document).on('click','.gallery-image-lightbox .arrowr',function() {
    moveRight();
});

$(document).on('click','.gallery-image-lightbox .arrowl',function() {
    moveLeft();
});

$(document).on('click','.img-list-choices',function(){
    let search = $('.img-list img').removeClass('active');
    let newImage = $(this).attr('src');
    $(this).addClass('active');
    
    $('.gallery-image-lightbox .img-container img').attr('src', newImage);
    $('.filter').css('background-image', 'url(' + newImage + ')');

    if ($(this).is(':last-child')) {
        $('.arrowl').css('display', 'block');
        $('.arrowr').css('display', 'none');
    } else if ($(this).is(':first-child')) {
        $('.arrowr').css('display', 'block');
        $('.arrowl').css('display', 'none');
    } else {
        $('.arrowr').css('display', 'block');
        $('.arrowl').css('display', 'block');
    }
})

// Show Get Quote Form
$(document).on('click','.btn--get-quote',function(){
    $('div.form').fadeIn(500);
});

// Close Get Quote Form
$(document).on('click','div.form, div.form svg',function(e){
    if(e.target.className === 'form' || e.target.className.baseVal === 'form-close') $('div.form').fadeOut(250);
});

// Active Navigation Link
const changedActiveLink = function(e,link){
    $('.navigation__wrap a').removeClass('active');
    if(e !== '#get_a_quote') $(link).addClass('active');
    const checkBoxes = $('#navi-toggle');
    checkBoxes.prop("checked", false);
}

$(document).on('click','.navigation__wrap a',function(e){
    $('.navigation__wrap a').removeClass('active');
    changedActiveLink(e.target.hash,this);
});

let scrollPosition = 0;

$(window).scroll(function (e) {
    scrollPosition = $(window).scrollTop();
    let header = $('.header');

    // Header Visibility
    if(scrollPosition < header.height()){
        header.removeClass('invisible');        
    }else{
        header.addClass('invisible');
    }

    // Active Navigation Link
    const body = $('body').height();
    const home = $('.hero').height();
    const overview = $('.overview').height();
    const about = $('.about').height();
    const services = $('.services').height();
    const our_projects = $('.our_projects').height();
    const footer = $('.footer').height();

    // About
    if(body - (home+overview+services+our_projects+about+footer-300) > scrollPosition) {
        changedActiveLink('scroll','.navigation__wrap li:nth(0) a');
    }

    // About
    if(body - (services+our_projects+about+footer+300) < scrollPosition) {
        changedActiveLink('scroll','.navigation__wrap li:nth(1) a');
    }
    
    // Services
    if(body - (services+our_projects+footer+300) < scrollPosition) {
        changedActiveLink('scroll','.navigation__wrap li:nth(2) a');
    }

    // Projects
    if(body - (our_projects+footer+300) < scrollPosition) {
        changedActiveLink('scroll','.navigation__wrap li:nth(3) a');
    }


});

// Arrow-Up
$(document).on('click','.arrow-up',function(e){
    e.preventDefault();
    window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth'
      });
});