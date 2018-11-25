(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{33:function(e,t,n){e.exports=n(81)},38:function(e,t,n){},40:function(e,t,n){},68:function(e,t){},71:function(e,t,n){},73:function(e,t,n){},75:function(e,t,n){},77:function(e,t,n){},79:function(e,t,n){},81:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n.n(a),o=n(31),r=n.n(o),c=(n(38),n(7)),i=n(2),l=n(4),u=n(3),m=n(1),h=n(5),d=(n(40),n(32)),f=n.n(d).a.connect("http://localhost:3030"),p=(n(71),function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).handleChange=function(e){n.setState({value:e.target.value})},n.handleSubmit=function(e){e.preventDefault(),n.props.handleSubmit(n.state.value),n.setState({value:""})},n.state={value:""},n}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"Controls"},s.a.createElement("form",{onSubmit:this.handleSubmit},s.a.createElement("input",{autoFocus:this.props.autofocus,placeholder:this.props.placeholder,onChange:this.handleChange,value:this.state.value,type:"text"}),s.a.createElement("a",{onClick:this.handleSubmit,className:"button"},this.props.buttonText)))}}]),t}(a.Component)),g=(n(73),function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,s=new Array(a),o=0;o<a;o++)s[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).handleSubmit=function(e){f.emit("join-room",e)},n}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"Rooms"},s.a.createElement(p,{buttonText:"Join",handleSubmit:this.handleSubmit,placeholder:"Room id"}),Object.keys(this.props.rooms).map(function(t){return s.a.createElement("p",{className:e.props.currentRoomId==t?"active":"",onClick:function(){return e.props.changeRoom(t)},key:t},t)}))}}]),t}(a.Component)),v=(n(75),n(77),{iceServers:[{urls:"stun:stun.services.mozilla.com"},{urls:"stun:stun.l.google.com:19302"}]}),b=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).gotUserMedia=function(e){n.setState({localStream:e,localStreamSRC:URL.createObjectURL(e),socketId:f.id}),f.on("signal",n.gotSignal).on("user-leftTranslation",function(e){if(e!=n.state.socketId){var t=Object(c.a)({},n.state.connections),a=Object(c.a)({},n.state.streams);delete t[e],delete a[e],n.setState({connections:t,streams:a})}else n.setState({connectons:{},streams:{}})}).on("user-joinedTranslation",function(e,t,a){if(console.log(typeof a,t),console.dir(a),a.forEach(function(e){if(!n.state.connections[e]){var t=Object(c.a)({},n.state.connections);t[e]=new RTCPeerConnection(v),t[e].onicecandidate=function(t){null!=t.candidate&&(console.log("sending ice"),f.emit("signal",e,JSON.stringify({ice:t.candidate})))},t[e].onaddstream=function(t){n.gotRemoteStream(t,e)},t[e].addStream(n.state.localStream),n.setState({connections:t})}}),t>=2){var s=n.state.connections[e];s.createOffer().then(function(t){s.setLocalDescription(t).then(function(){f.emit("signal",e,JSON.stringify({sdp:s.localDescription}))})}).catch(function(e){return console.log(e)})}})},n.gotSignal=function(e,t){var a=JSON.parse(t);if(e!=n.state.socketId){var s=n.state.connections[e];a.sdp&&s.setRemoteDescription(new RTCSessionDescription(a.sdp)).then(function(){"offer"==a.sdp.type&&s.createAnswer().then(function(t){s.setLocalDescription(t).then(function(){f.emit("signal",e,JSON.stringify({sdp:s.localDescription}))})})}).catch(function(e){return console.log}),a.ice&&s.addIceCandidate(new RTCIceCandidate(a.ice)).catch(function(e){return console.log})}},n.gotRemoteStream=function(e,t){var a=Object(c.a)({},n.state.streams);a[t]=URL.createObjectURL(e.stream),n.setState({streams:a})},n.joinTranslation=function(){f.emit("join-translation",n.props.room)},n.leaveTranslation=function(){f.emit("leave-translation",n.props.room)},n.state={socketId:"",localStream:{},localStreamSRC:"",streams:[],connections:[]},n.localVideo=s.a.createRef(),n}return Object(h.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){navigator.getUserMedia({video:!0,audio:!0},this.gotUserMedia,function(e){return console.log(e)})}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"VideoChat"},s.a.createElement("div",{className:"videos"},s.a.createElement("video",{style:{position:"absolute",right:"0px",bottom:"0px"},autoPlay:!0,src:this.state.localStreamSRC,ref:this.localVideo}),Object.keys(this.state.streams).map(function(t){return s.a.createElement("video",{autoPlay:!0,key:e.state.streams[t],src:e.state.streams[t]})})),s.a.createElement("div",{className:"control-panel"},s.a.createElement("button",{onClick:this.joinTranslation},"Join"),s.a.createElement("button",{onClick:this.leaveTranslation},"Leave")))}}]),t}(a.Component),j=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).handleChange=function(e){n.setState({message:e.target.value})},n.handleSubmit=function(e){e.preventDefault(),""!=n.state.message&&(f.emit("message",n.props.currentRoomId,n.state.message),n.setState({message:""}))},n.state={message:""},n.messagesBlock=s.a.createRef(),n}return Object(h.a)(t,e),Object(m.a)(t,[{key:"componentDidUpdate",value:function(){this.messagesBlock.current.scrollTop=this.messagesBlock.current.scrollHeight}},{key:"normalizeTime",value:function(e){return new Date(e).toTimeString().slice(0,9)}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"Chat"},s.a.createElement("div",{className:"videochat-wrapper"},s.a.createElement(b,{room:this.props.currentRoomId})),s.a.createElement("form",{className:"controls",onSubmit:this.handleSubmit},s.a.createElement("input",{autoFocus:!0,placeholder:"Write a message...",onChange:this.handleChange,value:this.state.message,type:"text"})),s.a.createElement("div",{ref:this.messagesBlock,className:"messages"},this.props.currentRoom.messages.map(function(t,n){return s.a.createElement("div",{className:["message",0==t.from?"message__service":"",t.from==e.props.userName?"message__self":""].join(" "),key:n},s.a.createElement("div",null,t.from?t.from==e.props.userName?s.a.createElement("span",null,t.message.text):s.a.createElement("div",null,s.a.createElement("div",{className:"message_from"},t.from),s.a.createElement("div",null,t.message.text)):t.message.text),s.a.createElement("div",{className:"timestamp"},s.a.createElement("span",null,e.normalizeTime(t.message.timestamp))))})))}}]),t}(a.Component);n(79);var S=function(e){return s.a.createElement("div",{className:"RoomInfo"},s.a.createElement("div",{className:"chatInfo"},s.a.createElement("h1",null,"Chat users"),e.chatUsers.map(function(e){return s.a.createElement("p",{key:e},e)})),s.a.createElement("div",{className:"translationInfo"},s.a.createElement("h1",null,"Translation users"),e.translationUsers.map(function(e){return s.a.createElement("p",{key:e},e)})))},O=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).changeRoom=function(e){e!=n.state.currentRoomId&&(n.setState({currentRoomId:e}),n.getChatInfo())},n.getChatInfo=function(){f.emit("get-chat-info",n.state.currentRoomId)},n.state={currentRoomId:e.user.id,chatUsers:[],translationUsers:[]},n}return Object(h.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=this;f.on("joined",function(t){e.setState({currentRoomId:t}),e.getChatInfo()}).on("chat-info",function(t){console.log("Got chat info"),console.dir(t),e.setState({chatUsers:t.chatUsers,translationUsers:t.translationUsers})}).on("user-joinedTranslation",this.getChatInfo).on("user-leftTranslation",this.getChatInfo).on("user-joined",this.getChatInfo).on("user-left",this.getChatInfo),this.getChatInfo()}},{key:"render",value:function(){return s.a.createElement("div",{className:"Dash"},s.a.createElement(g,{changeRoom:this.changeRoom,rooms:this.props.user.rooms,currentRoomId:this.state.currentRoomId}),s.a.createElement(j,{userName:this.props.user.id,sendMessage:this.sendMessage,currentRoomId:this.state.currentRoomId,currentRoom:this.props.user.rooms[this.state.currentRoomId]}),s.a.createElement(S,{chatUsers:this.state.chatUsers,translationUsers:this.state.translationUsers}))}}]),t}(a.Component),E=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).register=function(e){f.emit("register",e)},n.registered=function(e){var t=Object(c.a)({},n.state.user);t.id=e,t.rooms[e]={users:[],messages:[]},n.joinRoom(e),n.setState({user:t,isRegistered:!0})},n.joinRoom=function(e){f.emit("join-room",e)},n.joined=function(e,t){console.log("I joined ".concat(e));var a=Object(c.a)({},n.state.user);a.rooms[e]||(a.rooms[e]={users:[],messages:[]}),a.rooms[e].users.push(t),console.dir(a),n.setState({user:a})},n.message=function(e,t,a){console.dir(a);var s=Object(c.a)({},n.state.user);s.rooms[e].messages.push({from:t,message:a}),n.setState({user:s})},n.state={isRegistered:!1,user:{rooms:{},id:""}},n}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"App"}," ",this.state.isRegistered?s.a.createElement(O,{user:this.state.user}):s.a.createElement(p,{autofocus:!0,placeholder:"Username",buttonText:"Login",handleSubmit:this.register})," ")}}]),Object(m.a)(t,[{key:"componentDidMount",value:function(){f.on("message",this.message).on("registered",this.registered).on("user-joined",this.joined).on("error",function(e){return console.log(e)})}}]),t}(a.Component);r.a.render(s.a.createElement(E,null),document.getElementById("root"))}},[[33,2,1]]]);
//# sourceMappingURL=main.313e027f.chunk.js.map