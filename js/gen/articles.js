let observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach(entry => {
          let id = entry.target.id;

          if(id === 'canvas-verbal'){
            if (entry.intersectionRatio > 0) {
                  horizontalBar(experienceData, '#canvas-verbal', 'verbal', '#0c3280', '#2eb5c3', 'gender', '100');
              } else {
                  clearCanvas('#canvas-verbal')
              }
          }
          if(id === 'canvas-physical'){
            if (entry.intersectionRatio > 0) {
                  horizontalBar(experienceData, '#canvas-physical', 'physical', '#ff4700', '#ffb000', 'gender', '100');
              } else {
                  clearCanvas('#canvas-physical')
              }
          }
          if(id === 'canvas-perp'){
            if (entry.intersectionRatio > 0) {
                  horizontalBar(perpData, '#canvas-perp', 'value', '#2eb5c3', '#2667ff', 'key', '200');
              } else {
                  clearCanvas('#canvas-perp')
              }
          }
          if(entry.target.classList.contains('infographic')){
            if (entry.intersectionRatio > 0) {
              entry.target.classList.add('art-in');
            } else {
                entry.target.classList.remove('art-in');
            }
          }
          });
    },
    {rootMargin: '0px 0px -20px 0px', threshold: 0, root: null}
)

document.querySelectorAll('.art-canvas').forEach(canvas => {observer.observe(canvas)})
