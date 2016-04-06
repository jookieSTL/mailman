var MailMan = function(options)
{
  if(!options) this.logging(0);
  else
  {
    for(i in options)
    {
      if(options.hasOwnProperty(i))
      {
        /* THESE PROPERTIES NEED TO BE DEFINED, KID */
        switch(i)
        {
          case "id" : this.id = options[i];
          break;
          case "zip": this.zip = options[i];
          break;
          case "city" : this.city = options[i]
          break;
          case "state" : this.state = options[i]
          break;
          case "data" : this.data = options[i]; // either JSON or JS object
          break;
          case "url" : this.url = options[i]; // path to JSON or JS object
          break;
          case "logs" : this.logs = options[i]; // turn on console logging (debug)
          break;
        }
      }
    }
    this.logging();
    this.initialize.apply(this, arguments);
  }
}
MailMan.prototype = {
  /* LET ME GET THIS STRAIGHT (INITIAL SETUP) */
  initialize:function()
  {
    this.logging(1);
    this.zip.focus();
    
    switch(this.data)
    {
      case "json" : this.learn();
      break;
      default : this.grip(this.data);
    }
  },
  /* STUDY HARD. LEARN KUNG FU (AJAX CALL) */
  learn:function()
  {
    var _this = this;

    _this.logging(2);
    
    $.ajax({
      type:"get",
      dataType:"json",
      url:_this.url,
      beforeSend:function()
      {
        _this.logging(3);
      },
      error:function()
      {
        _this.logging(4);
      },
      success:function(response)
      {
        _this.logging(5);
        _this.grip(response);
      }
    });
  },
  /* GO ON & DO IT, SON! (EXECUTE) */
  grip:function(response)
  {
    var _this = this;
    
    _this.logging(6);
    
    $(this.zip).change(function()
    {
      $.each(response, function(i, elements)
      {
        $.each(elements, function(j, contents)
        {
          if(_this.zip.val() == contents)
          {
            var city_label = $("<label>", {
              "text":"City",
              "id":"city_label"
            });
            var city_input = $("<input>", {
              "type":"text",
              "id":"city_input"
            }).val(elements.FPO);
            var state_label = $("<label>", {
              "text":"City",
              "id":"state_label"              
            });
            var state_input = $("<input>", {
              "type":"text",
              "id":"state_input"
            }).val(elements.AA);
            
            if($("#city_input") && $("#state_input"))
            {
              $("#city_label, #city_input, #state_label, #state_input").remove()
            }
            $("fieldset").append(city_label, city_input, state_label, state_input);
          }
        });
      });
    });
  },
  /* WHAT'S GOING ON UNDER THE HOOD? */
  logging:function(step)
  {
    if(this.logs)
    {
      var console_message;
      
      switch(step)
      {
        case 0 : console_message = "Too bad, chump! You can't learn KUNG FU w/o training."; // forgot to set initial properties.
        break;
        case 1 : console_message = "Beginning your KUNG FU training, Daniel-san."; // initializing object.
        break;
        case 2 : console_message = "Wax on, wax off. Now learning KUNG FU."; // making an AJAX call.
        break;
        case 3 : console_message = "Hold up. I'm working, yo!"; // making an AJAX call.
        break;
        case 4 : console_message = "Whoops! Somethign got hosed."; // AJAX failure.
        break;
        case 5 : console_message = "BOOM! It's all good"; // successful AJAX call.
        break;
        case 6 : console_message = "Hi-Yah! You now know KUNG FU!"; // everthing's ready to go.
        break;
        default : console_message = "******* LOGGING ENABLED *******";
      }
      console.log(console_message);
    }
  }
}