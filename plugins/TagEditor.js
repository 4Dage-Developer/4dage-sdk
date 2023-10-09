var TagEditor=function(){"use strict";var t=function(t){function e(e){t.call(this),this.app=e,this.tag=null,this.player=null,this._is_enter=!1,this._is_split=!0,this._handler=null}t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e;var i={tags:{configurable:!0}};return i.tags.get=function(){return this.app.TagManager.tags||(this.app.TagManager.tags=[]),this.app.TagManager.tags},e.prototype.enter=function(t){var e=this;this.app.TagManager.hideAll();var i=this.app.store.getValue("metadata");if(i&&"laser"===i.sceneFrom&&(this._is_split=!1),this.player=this.app.core.get("Player"),this.tag="string"==typeof t?this.tags.find((function(e){return e.sid==t})):t,this._is_enter=!0,!this.tag)return this.align();var n=this.player.model.panos.closestPanoTowardPoint({point:this.tag.position,getAll:!0}).map((function(t){return t.pano})).filter((function(t){return e.tag.visiblePanos.indexOf(t)>-1&&t.position.clone().setY(e.tag.position.y).sub(e.tag.position).length()>1.5})),a=n[0],r=n.filter((function(t){return t.floorIndex==e.player.model.currentFloor.floorIndex}));return r.length>0&&(a=r[0]),a||(a=this.player.currentPano),new Promise((function(t){e.player.flyToPano({pano:a,lookAtPoint:e.tag.position,aimDuration:0,duration:1},(function(){e.align().then((function(){e._handler.markTagPos=e.tag.position,t()}))}))}))},e.prototype.exit=function(){var t=this;if(this.app.TagManager.showAll(),this._is_split){if(!this._handler)return;this.app.core.get("Scene").restore("TAG"),this._handler.exit({cancel:!0})}else this.player.locked=!1,this.player.reticule.visible=!0,this.spot3d.visible=!1,this.updateTagPos=!1;setTimeout((function(){t.player.cameraControls.activeControl.camera.fov=70,t.player.camera.fov=t.player.baseFov*(1/t.player.zoomLevel)}),50),this.tag=null,this._is_enter=!1,this._is_split=!0},e.prototype.align=function(){var t=this;return this.app.core.get("Scene").getSplit("TAG").then((function(e){null===t._handler&&(t._handler=t.app.withNewComponent("TagEditManager",e,{spotA:t.app.dom.querySelector('.player[name="main"] .player-mark'),spotB:t.app.dom.querySelector('.player[name="copy"] .player-mark')})),t.tag?t._handler.reSetPos(t.tag.position):t._handler.enter()}))},e.prototype.confirm=function(t){if(void 0===t&&(t=!0),this._handler){var e=this.tag,i=this._handler.confirmPos(),n=i.position,a=i.sid;if(!n)return t&&this.exit(),null;var r=this.app.TagManager.getVisiblePano(n);return 0==r.length&&r.push(this.player.model.panos.index[this.player.currentPano.id]),null==e?e={position:n,visiblePanos:r,sid:a,icon:this.app.resource.base("images/tag_icon_default.svg")}:e.position=n,e.panoId=this.player.currentPano.id,t&&this.exit(),e}},e.prototype.save=function(t,e){if(void 0===e&&(e=[]),!t)return Promise.reject("参数错误");var i=[];t.forEach((function(t){var e=Object.assign({},t);e.visiblePanos&&e.visiblePanos.length&&(e.visiblePanos=e.visiblePanos.map((function(t){return t.id}))),e.icon&&(-1!=e.icon.indexOf("tag_icon_default.svg")?e.icon="":e.icon=e.icon.split("/").pop()),e.icon||(e.icon=""),i.push({sid:t.sid,hotData:JSON.stringify(e)})}));var n={num:this.app.config.num,hotDataList:i,icons:e};return this.app.remote_editor.tag_save(n)},e.prototype.delete=function(t){if(!t||!Array.isArray(t)||!t.length)return Promise.reject("参数错误");var e={num:this.app.config.num,sidList:t};return this.app.remote_editor.tag_delete(e)},Object.defineProperties(e.prototype,i),e}(KanKan.MITT.Emiter);return function(e,i){var n=KanKan.Deferred();return e.Scene.on("loaded",(function(){var a=new t(e,i);a.$name="TagEditor",a.$load=function(){e.TagManager.install("editor",a)},n.resolve(a)})),n}}();
