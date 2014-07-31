export default {
	name: "signature",

	initialize: function (container) {
		var PostMenuView = container.lookupFactory("view:post-menu");

		var loadSignature = function(post){			
			if (Discourse.User.current() != null)
			{
				var articleElem =  $(post).find("article");
				var postid = $(articleElem).attr("data-post-id");
				var elem = $('#sig_' + postid);	
				
				console.log("PostID: " + postid);							

				if (elem != null)
				{					
					var user = $(elem).attr("data-user");
					console.log("Elem found, user: " + user);
					$.ajax({
						type: "GET",
						url: "http://www.minecraftpvp.com/profile/signature/" + user,
						async: false,
						success : function(data) {
							if (data != null && data != "" && $.trim(data) != "")
							{
								console.log(data);
								$(elem).html("<hr />" + data + "<hr />");
							}
						}
					});
				}
				else
				{
					console.log("Elem not found.");
				}
			}
		};

		if (typeof(Discourse.PostView.prototype.on) == "function")
		{
			Discourse.PostView.prototype.on("postViewInserted", loadSignature);
		}

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
					buffer.push("<div style='clear:both' id='sig_" + post.get('id') + "' data-user='" + post.get('username') + "'></div>");					
				}
			}
		});

	}
};