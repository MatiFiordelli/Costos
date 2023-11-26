import { fetchData } from "./services/fetchData.js"

/* const chart = () => {
    

    window.onload = async() => {
        screen.orientation.onchange = (e) => {
            console.log(e.target.angle)
        }

        Chart.defaults.global.responsive = true
        Chart.defaults.global.animation = true
        Chart.defaults.global.animationSteps = 160

        const data = await fetchData('Ingredients')
        const names = data.map((e)=>e.ingrediente)
        const prices = data.map((e)=>e.precio)

        const lineData = {
            labels: names,
            rotation:90,
            datasets: [
                {
                    label: "Ingredientes",
                    fillColor: "rgb(179, 31, 166, .4)",
                    strokeColor: "rgba(0,0,0,.1)",
                    pointColor: "rgba(100,100,100,1)",
                    pointStrokeColor: "#aaa",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: prices
                }
            ],
            options: {
               rotation: (-0.5 * Math.PI) - (25/180 * Math.PI),
                scales: {
                    y: {
                      beginAtZero: true
                    }
                },
                legend:{
                    display:true,
                    position:'right',
                },
                plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'Chart.js Bar Chart'
                    }
                  }
            }
        }

        const ctx = document.querySelector('#main-chart').getContext('2d')
        ctx.rotate(90)
        new Chart( ctx ).Bar( lineData )
    }
} */

const chart = async () => {
    screen.orientation.onchange = (e) => {
        location.reload()
    }
    window.onload = async() => {
        const ingredients = await fetchData('Ingredients')
        const names = ingredients.map((e)=>e.ingrediente)
        const prices = ingredients.map((e)=>e.precio)
        
		const data = {
			labels: names,
			datasets: [{
				label: 'Precios de Ingredientes',
				data: prices,
				backgroundColor: [
					'rgba(255, 26, 104, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
					'rgba(0, 0, 0, 0.2)'
				],
				borderColor: [
					'rgba(255, 26, 104, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(0, 0, 0, 1)'
				],
				borderWidth: 1
			}]
		};

		const config = {
			type: 'bar',
			data,
			options: {
				scales: {
                    y: {
                        beginAtZero: true,
                    }
				}
			}
		}

		const theChart = new Chart(
			document.getElementById('chart'), config
		)

        /* Chart.defaults.global.responsive = true
        Chart.defaults.global.animation = true
        Chart.defaults.global.animation.duration=5000
        Chart.defaults.global.animationSteps = 160
        Chart.defaults.global.legend.labels.fontColor="#912f46"
        Chart.defaults.global.defaultFontColor="#00acc8"
        Chart.defaults.global.defaultFontSize=20
        Chart.defaults.global.title.display=true
        Chart.defaults.elements.bar.borderWidth=2
        Chart.update() */
    }
}
export default chart()