/*
Хочу обратить ваше внимание Максим на то что в некоторых местах я обращаюсь к родителю елемента, а в некоторых к самому елементу.
Основу id-шникам елементов даешь отталкиваясь от id поля тоесть вот так ---> nameEl-1_1 . У меня вот так field1-1_1.  
И последнее если тебе нужно перезаписать стили используй селектор у которого выше приоритетность или в CSS !important как в class-е red 


*/

let config = { /// <---- вот тут вот моно прописы классы и id на который строяться твои поля 

	fieldClass: 'field', /// Класс который ты присвоил полям,
	nameField_1: 'field1', /// ID который вы дали первому полю,
	nameField_2: 'field2', /// ID который вы дали второму полю,

}





function getElementForEvent( e ) { /// Эта функция возвращает елемент на который кликнул долбаеб User 

	if( window.event ){ /// Оптимизация для EI 7-8
		return event.srcElement;
	}else {
		return e.target; /// Так берут елемент норм браузеры 
	}

}

function changeColor( e ) {  /// Функция которая меняет цвет, можешь назвать ее по другому но думаю логику поймешь 
	let id = getAnotherElementId(e) 
	let el = document.getElementById(id);
	console.log(el);


	if(el.classList.contains( 'red' )){ /// Проверяем на наличие 
		el.classList.remove( 'red' ); /// Удаляем класс 
	}else{
		el.classList.add( 'red' ); /// Добавляем класс
	}
}

function isField( e ) {  /// Проверяем на что кликнул долбаеб User, Если на поле то вернем True,иначе undefined (false) 
	let elParent = e.parentNode; /// Берем родителя елемента 
	if( elParent.className && (elParent.className.indexOf( config.fieldClass ) != -1) ) return true; /// Проверяем на наличие нужного класса 
}

function getAnotherElementId( e ) { /// <--- ВСЯ МАГИЯ ТУТ. Меняем id с первого на второй или на обарот. 
	return (e.parentNode.id === config.nameField_1) ? /// Условие 
		e.id.replace(config.nameField_1, config.nameField_2): /// Если
		e.id.replace(config.nameField_2, config.nameField_1); /// Иначи 
}


window.onload = function() {

	document.body.onclick = function( e ) {

		let el = getElementForEvent(e);

		if( isField(el) ){
			changeColor( el );
		}
	}

}

