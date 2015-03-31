//Task - http://forum.jscourse.com/t/27-zadacha-vidzhet-taglist/857
(function() {

	function TagList(node, array) {
		this.node = node;
		this.tagArray = array ? array.slice() : [];

		this.taglist = this.Init(this.tagArray);
		this.fulfillArray(this.tagArray);
		this.clicksAction();
	}

	TagList.prototype.Init = function(tagArray) {
		var $taglist = $('<div class="taglist"></div>');
		var $mode = $('<div id="edit">Hide edit</div>');
		var $tagHolder = $('<div class="tagholder"></div>');
		var $form = $(
			'<form name="addTag">' +
			'<input type="text" placeholder="Enter Tag name">' +
			//Type should be SUBMIT111 DON'T TUCH! (+add.preventDefault())
			'<button class="add" >Add</button>' +
			'<button class="removeAll">Remove All</button>' +
			'</form>');
		$taglist.append($mode).append($tagHolder).append($form);
		$(this.node).append($taglist);
		console.log('$(this.node)', $(this.node));
		return $taglist;
	};

	TagList.prototype.fulfillArray = function(tagArray) {
		for (var i = 0; i < tagArray.length; i++) {
			this.newTag(tagArray[i]);
		}
	};

	TagList.prototype.newTag = function(tagTitle) {
		console.log(this);
		var $tag = $('<div class="tag"></div>');
		var $tagName = $('<div class="name">' + tagTitle + '</div>');
		var $tagClose = $('<div class="close">X</div>');
		$tag.append($tagName).append($tagClose);
		$(this.taglist).find(".tagholder").append($tag);
	};

	TagList.prototype.clicksAction = function() {
		var thisTag = this;
		$(this.taglist).on('click', '.close', function() {
			$(this).parent().remove();
		});
		//use delegate https://www.youtube.com/watch?v=wB1l6zdCk6Y
		$(this.taglist).on('click', '.add', function(event) {
			event.preventDefault();
			var text = $(this).parent().find('input[type="text"]')[0].value.trim();
			if (thisTag.tagArray.indexOf(text) === -1 && text !== "") {
				thisTag.newTag(text);
				thisTag.tagArray.push(text);
				$(this).parent().find('input[type="text"]')[0].value = "";
			}
		});

		$(this.taglist).on('click', '.removeAll', function(event) {
			event.preventDefault();
			thisTag.taglist.find('.tag').remove();
			thisTag.tagArray = thisTag.tagArray.splice();
		});

		$(this.taglist).on('click', '#edit', function(event) {
			$(thisTag.taglist).find("form").toggle(1000);
			$(thisTag.taglist).find(".close").toggle();
			var textEditShow = $(thisTag.taglist).find('#edit').text();
			$(thisTag.taglist).find('#edit').text(textEditShow === "Hide edit" ? "Add tags" : "Hide edit");
			$(thisTag.taglist).find('input[type="text"]')[0].value = "";
		});
	};

	window.TagList = TagList;
}());