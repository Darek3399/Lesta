const scroll = (array, container) => {


	// // СЕТАЕМ ИЗНАЧАЛЬНОЕ РАЗПОЛОЖЕНИЕ БЛОКОВ
	const setCurrentGap = () => {
		for (let i = 0; i < array.length; i++) {

			const gap = () => {
				if (i !== 0) {
					return 10
				}
				return 0
			}

			array[i].style.left = `${array[0].getBoundingClientRect().width * i + (gap() * i)}px`
		}
	}
	setCurrentGap()


















	// // СМЕЩЕНИЕ ПРИ ПЕРЕТАСКИВАНИИ И ПЛАВНЫЙ ВОЗВРАТ ПРИ ОТПУСКАНИИ--------------------------
	for (let item of array) {
		// отключаем mousemove при mouseup. listener mouseup возвращает false
		let toggleMousemove = false

		// переключатель, для отработки расчёта максимально допустимоого left не больше 1 раза
		let setLastLeftToggle = false
		// сетаем максимально допустимое значение left для items
		let setLastLeft = []

		// расчёт отступа left для того, чтоб right был 0. ширина контейнера  минус  ширина item
		const lastItemLeft = parseInt(container.getBoundingClientRect().width - array[0].getBoundingClientRect().width)

		let init = []
		for (let i = 0; i < array.length; i++) {
			init[i] = parseInt(array[i].style.left)
		}







		// СЕТАЕМ НАЧАЛЬНОЕ ПОЛОЖЕНИЕ НАЖАТИЯ
		item.onmousedown = (e) => {




			let initIndent = []
			toggleMousemove = true

			let touchOffsetX = e.screenX

			for (let i = 0; i < array.length; i++) {
				array[i].style.transition = '0s'
				initIndent[i] = parseInt(array[i].style.left)
			}






			// ОБНОВЛЯЕМ ПОЛОЖЕНИЕ ЭЛЕМЕНТОВ ПРИ ДВИЖЕНИИ КУРСОРА
			window.onmousemove = (event) => {

				if (!toggleMousemove) {
					return
				}



				for (let i = 0; i < array.length; i++) {

					let target = initIndent[i] - (touchOffsetX - event.screenX)

					array[i].style.left = `${target}px`
				}
				if (parseInt(array[array.length - 1].style.left) < lastItemLeft) {
					setLastLeftToggle = true
				}

				if (setLastLeftToggle) {
					if (!setLastLeft[0]) {
						for (let i = 0; i < array.length; i++) {
							setLastLeft[i] = parseInt(array[i].style.left)
						}
					}
				}







				window.onmouseup = () => {
					toggleMousemove = false

					for (let i = 0; i < array.length; i++) {
						array[i].style.transition = '1s ease-in-out'


						if (parseInt(array[0].style.left) > init[0]) {
							for (let it = 0; it < array.length; it++) {
								array[it].style.left = `${init[it]}px`
							}
						}


						if (parseInt(array[array.length - 1].style.left) < lastItemLeft) {
							setLastLeftToggle = 1
							for (let ite = 0; ite < array.length; ite++) {
								array[ite].style.left = `${setLastLeft[ite]}px`
							}
						}
					}

				}
			}
		}





		// динамическая подстройка ширины items при ресайзе
		window.addEventListener(`resize`, () => {
			for (let i = 0; i < array.length; i++) {

				const gap = () => {
					if (i !== 0) {
						return 10
					}
					return 0
				}

				array[i].style.left = `${array[0].getBoundingClientRect().width * i + (gap() * i)}px`
			}
		})
	}

}


export default scroll