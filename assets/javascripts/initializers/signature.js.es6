export default {
	name: "signature",

	initialize: function (container) {
		var PostMenuView = container.lookupFactory("view:post-menu");

		PostMenuView.reopen({      
			
			render: function(buffer) {
				var post = this.get('post');

				buffer.push("<nav class='post-controls'>");
				this.renderReplies(post, buffer);
				this.renderButtons(post, buffer);
				this.renderAdminPopup(post, buffer);				
				buffer.push("</nav>");

				this.renderSignature(post, buffer);
				
			},

			renderSignature: function(post, buffer) {
				$.ajax({
					type: "GET",
					url: "http://www.minecraftpvp.com/profile/signature/" + post.get('username'),
					async: false,
					success : function(data) {
						if (data != "")
						{
							buffer.push("<div style='clear:both'><hr />" + data + "<hr /></div>")
						}
					}
				});
			}
		});

	}
};