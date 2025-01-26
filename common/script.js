//Pauses execution for a specified number of milliseconds.
async function wait(interval) {
    return new Promise(resolve => setTimeout(resolve, interval));
}


document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach((el => {

        let interval = 3000

        if(el.dataset.interval){
            interval = parseInt(el.dataset.interval)
        }

        let classesProp = el.dataset.carousel
        if(!classesProp){
            return
        }
        let classes = classesProp.split(",")
        let current = 0

        let triggerNext = async () => {
            
            let next = current + 1 
            let currentClass = classes[current]
            
            if(next >= classes.length){
                next = 0
            }

            el.style.opacity = 0;
            await wait(450)

            el.classList.remove(currentClass)
            el.classList.add(classes[next])
            current = next
            
            await wait(100)
            el.style.opacity = 1;
           
        }
    
        let _interval
        let begin = () => {

            if(_interval){
                clearInterval(_interval)
            }
        
            _interval = setInterval(triggerNext,interval)
        }

        el.addEventListener("click",() => {
            triggerNext()
            begin()
        })

        begin()
        

    }))

  });
  

  /*
  <div class="accordion">
        <div class="accordion-item">
            <button class="accordion-header">
                <strong class="txt-giant">40 Years of Expertise:</strong>
            </button>
            <div class="accordion-content">
                <p>Trusted locally owned and operated business since 1985.</p>
            </div>
        </div>
    </div>

      <div class="accordion blinds">
        <div class="accordion-item">
            <button class="accordion-header">
                <strong class="txt-giant">40 Years of Expertise:</strong>
            </button>
            <div class="accordion-content">
                <p>Trusted locally owned and operated business since 1985.</p>
            </div>
        </div>
    </div>
  */
  document.addEventListener('DOMContentLoaded', () => {

    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach((accordion) => {
        const accordionHeaders = accordion.querySelectorAll('.accordion-header');
        let isBlinds = accordion.classList.contains("blinds")

        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
    
                isBlinds || accordionHeaders.forEach(otherHeader => {
                    otherHeader.classList.remove('active');
                    const otherContent = otherHeader.nextElementSibling;
                    otherContent.classList.remove('active');
                    otherContent.style.maxHeight = null;
                });
    
                // Toggle active class on the clicked header
                header.classList.toggle('active');
    
                // Toggle active class on the corresponding content
                const content = header.nextElementSibling;
                content.classList.toggle('active');
    
                // Adjust max-height for smooth transition
                if (content.classList.contains('active')) {
                    content.style.maxHeight = "auto";
                } else {
                    content.style.maxHeight = null;
                }
    
       
                
            });
        });
    })


});
