// Inspired by the code from http://jointheconversation.org


jQuery.githubUser = function(username, callback) {
  jQuery.getJSON("https://api.github.com/users/" + username + "/repos?callback=?", callback);
}

jQuery.fn.loadRepositories = function(username) {
  this.html("<span>Querying GitHub for repositories...</span>");

  var target = this; 
  $.githubUser(username, function(response) {
    var repos = response.data;
    sortByNumberOfWatchers(repos);

    var list = $('<dl/>');
    target.empty().append(list);
    $(repos).each(function() {
      if (!this.fork) {
        list.append('<dt><a href="'+ this.html_url +'">' + this.name + '</a></dt>');
        list.append('<dd>' + this.description + '</dd>');
      }
    });
  });

  function sortByNumberOfWatchers(repos) {
    repos.sort(function(a,b) {
      return b.watchers - a.watchers;
    });
  }
};
