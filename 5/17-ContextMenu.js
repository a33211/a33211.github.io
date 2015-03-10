'use strict';

(function() {
	var hasSubmenu = 'context-menu-has-sumenu'

	function MoveTop(node, testFunc, lastParent) {
			while (node && node !== lastParent) {
				if (testFunc(node)) {
					return node;
				}
				node = node.parentNode;
			}
		}

	function ContextMenu(node, menuStructure) {
		this.root = node;
		this.menu = this.MenuMarkup(menuStructure);
		this.SubmenuBehaviour()
		document.body.appendChild(this.menu); //Data's linked by arguments of MenuMarkup!!!
		this.root.addEventListener('contextmenu', this.onRootContextMenu.bind(this), false);
		this.root.addEventListener('click', this.onGlobalClick.bind(this), false);
	}

	ContextMenu.prototype.MenuMarkup = function(structure) {
		var root = document.createElement('ul')
		root.className = 'context-menu';
		var menuItemNode
		var submenuArrowNode
		for (var i = 0; i < structure.length; i += 1) {
			menuItemNode = document.createElement('li')
			menuItemNode.innerHTML = structure[i].title;
			if (structure[i].submenu) {
				submenuArrowNode = document.createElement('span')
				submenuArrowNode.innerHTML = '◢';
				menuItemNode.className += ' ' + hasSubmenu;
				menuItemNode.appendChild(this.MenuMarkup(structure[i].submenu))
				menuItemNode.appendChild(submenuArrowNode)
			} else {
				menuItemNode.addEventListener('click', structure[i].action, false);
			}
			root.appendChild(menuItemNode)
		}
		return root;
	}

	ContextMenu.prototype.SubmenuBehaviour = function() {
		var subMenuHolders = this.menu.querySelectorAll('.' + hasSubmenu)
		Array.prototype.forEach.call(subMenuHolders, function(submenuHolder) {
			var submenuNode = submenuHolder.querySelector('ul')
			submenuHolder.addEventListener('mouseenter', function() {
				submenuNode.style.display = 'block';
			});
			submenuHolder.addEventListener('mouseleave', function() {
				submenuNode.style.display = 'none';
			});
		});

	};

	ContextMenu.prototype.onGlobalClick = function(event) {
		var menu = this.menu
		if (!MoveTop(event.target, function(node) {
				return menu === node
			})) {
			this.hide();
		}
	}

	ContextMenu.prototype.onRootContextMenu = function(event) { //For unfixed ContextMenu
		event.preventDefault();
		var x = event.clientX; //For page with scroll page.screenX
		var y = event.clientY; //For page with scroll page.screenY
		this.show(x, y);
	};


	ContextMenu.prototype.show = function(left, top) {
		//event.preventDefault();
		this.menu.style.display = 'block';
		this.menu.style.left = left + 'px';
		this.menu.style.top = top + 'px';
	}

	ContextMenu.prototype.hide = function() {
		//add setTimeout!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		this.menu.style.display = 'none';
	}
	window.ContextMenu = ContextMenu;
}())