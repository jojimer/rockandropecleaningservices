const projects = {
    cleaningServices: [
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
}

const galleries = document.getElementById('galleries');
const style = "linear-gradient( to bottom right,rgba(255,127,36, 0.2) 20%, rgba(92,57,19, 0.2)),";
const initGallery = (e) => {
    const i = e.target.getAttribute("data-index");
    const project = projects.cleaningServices[i];
    const src = `./img/${project.folder_name}/`;
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

projects.cleaningServices.map((v,i) => {
    const galleryElement = document.createElement('div');
    const src = `./img/${v.folder_name}/${v.images[0]}`;
    galleryElement.classList = "our_projects-gallery";
    galleryElement.setAttribute('data-index',i);
    galleryElement.style.backgroundImage = style+` url(${src})`;
    galleryElement.addEventListener('click',initGallery);
    galleries.appendChild(galleryElement);
})


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