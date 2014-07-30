export default {
	name: "signature",

	initialize: function (container) {
		var PostMenuView = container.lookupFactory("view:post-menu");

		var loadSignature = function($post){			
			if (Discourse.User.current() != null)
			{
				var postid = $post.prop("data-post-id");
				var elem = $post.find('#sig_' + postid);

				if (elem != null)
				{
					$.ajax({
						type: "GET",
						url: "http://www.minecraftpvp.com/profile/signature/" + post.get('username'),
						async: true,
						success : function(data) {
							if (data != null && data != "" && $.trim(data) != "")
							{
								$(elem).html("<hr />" + data + "<hr />");
							}
						}
					});
				}
			}
		};

		Discourse.PostView.prototype.on("postViewInserted", loadSignature);

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
				if (Discourse.User.current() != null)
				{
					buffer.push("<div style='clear:both' id='sig_" + post.get('id') + "'></div>");					
				}
			}
		});

	}
};