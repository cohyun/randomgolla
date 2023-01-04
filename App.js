import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React, { Component,useEffect,useRef,useState } from 'react';
import { StyleSheet,Button,Text, View,ScrollView,Image,ImageBackground, Pressable,TextInput, AsyncStorage, Alert} from 'react-native';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { FlatList, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { add, color, set } from 'react-native-reanimated';

//const 메뉴 정리 (수정불가)
const menu=[
  {name:'김치찌개',카테고리:'한식',알러지:'',특징:['매움','뜨거움'],육류:'소'},
  {name:'김밥',카테고리:'한식',알러지:'',특징:[''],육류:''},
  {name:'삼겹살',카테고리:'한식',알러지:'',특징:['뜨거움'],육류:'돼지'},
  {name:'냉면',카테고리:'한식',알러지:'',특징:['차가움'],육류:''},
  {name:'닭갈비',카테고리:'한식',알러지:'',특징:['매움','뜨거움'],육류:'닭'},
  {name:'매운탕',카테고리:'한식',알러지:'해산물',특징:['뜨거움','매움'],육류:'생선'},
  {name:'비빔밥',카테고리:'한식',알러지:'계란',특징:['매움'],육류:''},
  {name:'냉라면',카테고리:'한식',알러지:'',특징:['매움','차가움'],육류:''},
  {name:'국밥',카테고리:'한식',알러지:'',특징:['뜨거움'],육류:'소'},
  {name:'반미',카테고리:'베트남',알러지:'',특징:['패스트푸드'],육류:''},
  
  {name:'커리',카테고리:'인도',알러지:'',특징:['뜨거움'],육류:''},
  {name:'탄두리치킨',카테고리:'인도',알러지:'',특징:['뜨거움'],육류:'닭'},
  {name:'인도식볶음밥',카테고리:'인도',알러지:'견과류',특징:['뜨거움'],육류:'닭'},

  {name:'스테이크',카테고리:'양식',알러지:'',특징:['느끼함','뜨거움'],육류:'소'},
  {name:'파스타',카테고리:'양식',알러지:'',특징:['느끼함','뜨거움'],육류:''},
  {name:'피자',카테고리:'양식',알러지:'',특징:['뜨거움'],육류:''},
  {name:'햄버거',카테고리:'양식',알러지:'',특징:['패스트푸드'],육류:'닭'},
  {name:'케이크',카테고리:'양식',알러지:'계란',특징:['달달함'],육류:''},
  {name:'팬케이크',카테고리:'양식',알러지:'우유',특징:['달달함','뜨거움'],육류:''},
  {name:'파인애플 볶음밥',카테고리:'양식',알러지:'',특징:[''],육류:''},

  {name:'우동',카테고리:'일식',알러지:'',특징:['뜨거움'],육류:''},
  {name:'초밥',카테고리:'일식',알러지:'해산물',특징:[''],육류:'생선'},
  {name:'돈까스',카테고리:'일식',알러지:'',특징:['뜨거움'],육류:'돼지'},
  {name:'소바',카테고리:'일식',알러지:'',특징:['차가움'],육류:''},
  {name:'라멘',카테고리:'일식',알러지:'해산물',특징:['매움','뜨거움'],육류:''},
  {name:'샤부샤부',카테고리:'일식',알러지:'',특징:['매움','뜨거움'],육류:'소'},
  {name:'연어덮밥',카테고리:'일식',알러지:'해산물',특징:[''],육류:'생선'},
  {name:'가지덮밥',카테고리:'일식',알러지:'',특징:[''],육류:''},

  {name:'짜장면',카테고리:'중식',알러지:'',특징:['느끼함','뜨거움'],육류:'돼지'},
  {name:'짬뽕',카테고리:'중식',알러지:'해산물',특징:['매움','뜨거움'],육류:'돼지'},
  {name:'마라탕',카테고리:'중식',알러지:'',특징:['매움','뜨거움'],육류:'소'},
  {name:'꿔바로우',카테고리:'중식',알러지:'',특징:[''],육류:'닭'},
  {name:'탕수육',카테고리:'중식',알러지:'',특징:[''],육류:'돼지'},
  {name:'북경오리구이',카테고리:'중식',알러지:'',특징:['뜨거움'],육류:'오리'},
  {name:'동파육',카테고리:'중식',알러지:'',특징:['뜨거움'],육류:'돼지'},
  {name:'난자완스',카테고리:'중식',알러지:'',특징:[''],육류:''},

  {name:'쌀국수',카테고리:'베트남',알러지:'',특징:['뜨거움'],육류:'소'},
  {name:'월남쌈',카테고리:'베트남',알러지:'',특징:[''],육류:''},
  {name:'짜조',카테고리:'베트남',알러지:'',특징:[''],육류:'돼지'},

];

// 사용자의 선택에 따라 변화하는 usermenu 배열
var user_menu=[];
var count=0;


const styles=StyleSheet.create({
  mainBtn:{
    alignItems:'center',
    margin:40,
    borderRadius:20
  },
  input_st:{
   
    flex: 1, 
    fontSize: 40, 
    borderRadius:10,
    padding:10, 
    marginHorizontal : 5,
    backgroundColor:'rgb(233,233,233)',
    color:'gray'
    
    
  },
  menu_st:{
    fontSize:20,
    borderWidth:3,
    borderColor:'lightgray',
    borderRadius:10,
    padding:10
  },
  finalmenu_st:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    borderRadius:10,
    padding:50,
    marginTop:250,
    marginLeft:50,
    marginRight:50
  },
  sec2Btn_st:{
    flex:1,
    height:50,
    backgroundColor:'lightgray',
    borderRadius:10,
    marginRight:10,
    alignItems:'center',
    justifyContent:'center'
  },
  TouHigh:{
    marginLeft:90,
    marginRight:90,
    alignItems:'center',
    borderRadius:20,
    marginBottom:30,
    marginTop:270
  }
})






//main function
export default function App() {
  const[A,setA]=useState('hello');
  const Stack=createStackNavigator();
 
  return (
    
   <NavigationContainer>
     <Stack.Navigator 
     screenOptions={{headerShown:false}} //상단바 없앰
     >
       <Stack.Screen name="Home" component={HomeScreen}/>
       <Stack.Screen name="Sec1" component={Sec1Screen}/>
       <Stack.Screen name="Sec2" component={Sec2Screen}/>
       <Stack.Screen name="Sub" component={SubScreen}/>
       <Stack.Screen name="Thr" component={ThrScreen}/>
     </Stack.Navigator>
   </NavigationContainer>
   
    
  );
}








//마지막 화면(랜덤함수 돌려서 결과메뉴 출력)
function ThrScreen(){
  var num=Math.floor(Math.random()*(user_menu.length));
  const[fresh,Setfresh]=useState(0);
  var element;
  

  //랜덤중복제외
  function random(){
    if(user_menu.length==0){
    }
    else{
      console.log(num+"이 제거됩니다.");
      user_menu.splice(num,1);
      console.log(user_menu);
      console.log("-------------");
      num=Math.floor(Math.random()*(user_menu.length)+1);
      Setfresh(fresh+1);
    }
  }
  return(
    <View>
      <ImageBackground style={{height:'100%',width:'100%'}}
      source={require('./assets/sec3.png')}>
        <View style={styles.finalmenu_st}>
      <Text style={{fontSize:50,fontWeight:'bold'}}>{user_menu[num].name}</Text>
      </View>
      
      <TouchableOpacity disabled={element} style={styles.TouHigh} onPress={function(){
        if(user_menu.length==1){
          element=true;
          Alert.alert("다른 추천메뉴가 없습니다!");
        }
        else{
          element=false;
          console.log(num+"이 제거됩니다.");
          user_menu.splice(num,1);
          console.log(user_menu);
          console.log("-------------");
          num=Math.floor(Math.random()*(user_menu.length)+1);
          Setfresh(fresh+1);
        }
      }}>
         <Image style={{ resizeMode:'contain',width:400,height:70}}source={require('./assets/sec3Btn.png')}></Image>
       </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}



//press, 제외한다고 선택했을 때 usermenu에서 해당하는 원소 splice
function Press (props){
  var i;
  var j;
  var k;
  //카테고리, 알러지, 육류에 해당하는지 
  for(j=0;j<10;j++){
    for(i=0;i<user_menu.length;i++){
      if(user_menu[i].카테고리==props.thing || user_menu[i].알러지==props.thing || user_menu[i].육류==props.thing){
        user_menu.splice(i,1);
      }
    }
  }

//특징에 해당하는지 (특징은 2차원 배열이기 때문에 위와 다르게 탐색)
  for(j=0;j<3;j++){
    for(i=0;i<user_menu.length;i++){
      for(k=0;k<user_menu[i].특징.length;k++){
        if(user_menu[i].특징[k]==props.thing){
          user_menu.splice(i,1);  
        }
        else if(user_menu[i].특징[k]==null){
          continue;
        }
      }
    }
  }
  //확인
    console.log(user_menu);
    console.log('===============================');
}


//unpress, 제외하지 않을 때 해당하는 원소 usermenu에 다시 삽입
function unPress(props){
  var i;
  var j;
  var k;
  
  //카테고리, 알러지, 육류에 해당하면 삽입
    for(i=0;i<menu.length;i++){
      if(menu[i].카테고리==props.thing || menu[i].알러지==props.thing || menu[i].육류==props.thing){
        user_menu.push(menu[i]);
      }
    }

    //특징에 해당하면 해당 원소 삽입
    for(i=0;i<menu.length;i++){
        for(k=0;k<menu[i].특징.length;k++){
          if(menu[i].특징[k]==props.thing){
            user_menu.push(menu[i]); 
          }
          else if(menu[i].특징[k]==null){
            continue;
          }
        }
      }
    
    console.log(user_menu);
    console.log('===============================');
}



//Sec1Screen에서의 Button 함수
function Btn(props){
  const[color,setColor]=useState('white')
  
  var i;
  
  // 사용자메뉴에 모든 메뉴 추가 
  if(count==0){
  for(var i=0;i<menu.length;i++){
    user_menu.push(menu[i]);
    count++;
  }
}
  return(
    //토글
  <Pressable onPress={function(){
    if(color=='white'){
      setColor('lightgray');
      Press(props);
    }
    else if (color=='lightgray'){
      setColor('white');
      unPress(props);
    }    
    }}>
    <Text style={[styles.menu_st,{backgroundColor:color}]}>{props.thing}</Text>
    </Pressable>
  );
  
}








//랜덤골라 두번째 화면
function Sec1Screen({navigation}){
 user_menu=[];
 count=0;
  return (
    <View style={{paddingTop:30}}>
       <ImageBackground style={{width:'100%',height:900}}
     source={require('./assets/sec1.png')}>
       
       <View style={{justifyContent:'space-evenly',flexDirection:'row',padding:10,paddingTop:140,marginTop:30}}>
         <Btn thing='한식'/> 
         <Btn thing='양식'/> 
         <Btn thing='일식'/> 
         <Btn thing='중식'/> 
       </View>
       <View style={{width:'55%',justifyContent:'space-evenly',marginLeft:12,flexDirection:'row'}}>
       <Btn thing='베트남'/> 
         <Btn thing='인도'/> 
       </View>


       <View style={{justifyContent:'space-evenly',flexDirection:'row',padding:10,paddingTop:60}}>
         <Btn thing='해산물'/> 
         <Btn thing='견과류'/> 
         <Btn thing='계란'/> 
         <Btn thing='우유'/> 
       </View>

       <View style={{justifyContent:'space-evenly',flexDirection:'row',padding:10,paddingTop:70}}>
         <Btn thing='매움'/> 
         <Btn thing='뜨거움'/> 
         <Btn thing='차가움'/> 
         <Btn thing='달달함'/> 
       </View>
       <View style={{width:'60%',justifyContent:'space-evenly',marginLeft:12,flexDirection:'row'}}>
       <Btn thing='느끼함'/> 
         <Btn thing='패스트푸드'/> 
       </View>
       <View style={{justifyContent:'space-evenly',flexDirection:'row',padding:10,paddingTop:70}}>
         <Btn thing='소'/> 
         <Btn thing='돼지'/> 
         <Btn thing='닭'/> 
         <Btn thing='오리'/> 
         <Btn thing='생선'/> 
       </View>
       <TouchableOpacity style={{marginTop:40,marginLeft:100,marginRight:100,borderRadius:20,alignItems:'center'}} onPress={function (){navigation.navigate('Thr')}}>
         <Image style={{ resizeMode:'contain',width:400,height:80}}source={require('./assets/sec2Btn.png')}></Image>
       </TouchableOpacity>
       <View style={{height:200,width:600,backgroundColor:'white'}}></View>
     </ImageBackground>
     

     </View>
     
  
  );
}

//내리스트에서 골라 두번째 SUB화면
function SubScreen (){
  const[sel,setSel]=useState(null);
  return(
    <ScrollView>
    <Image style={{width:'100%',height:150}}source={require('./assets/rcmMenu.png')}/>
    <FlatList
    data={menu}
    renderItem={
      function({item,index}){
        
        const able=(index===sel)? true:false
        
        return <TouchableOpacity disabled={able} style={{padding:10,margin:10,flexDirection:'row',backgroundColor:'white',borderRadius:10}}
        onPress={function(){
          setSel(index);
          user_menu.push({name:menu[index].name})
          }}>
          <Text style={{fontSize:20,marginHorizontal:5,color}}> + {item.name}</Text>
        </TouchableOpacity>
      }
    }
    ></FlatList>
    </ScrollView>
  );
}


//내리스트에서골라 두번째 화면
function Sec2Screen({navigation}){
  
  const [A,setA]=useState('');
  const[extra,setExtra]=useState(false);
  const[sel,setSel]=useState(null);
  const[fresh,Setfresh]=useState(0);
 
  //강제 새로고침(SUB화면에서 usermenu에 삽입하고, 이 화면에 보이도록)
  const unsubscribe = navigation.addListener('focus', () => {
    refresh();
  });
  useEffect(() => {
    return () => unsubscribe();
  });

  function refresh(){
    Setfresh(fresh+1);
    setExtra(extra+1);
  }

  async function load_data(){
    var value=await AsyncStorage.getItem("usermenu");
    console.log(value);
    user_menu=JSON.parse(value);
    Setfresh(fresh+1);
  }
  
  async function save_data(){
    await AsyncStorage.setItem("usermenu",JSON.stringify(user_menu));
  }

  return (

    <ScrollView>
      <Image style={{width:'100%',height:150}}source={require('./assets/sec2.png')}/>    
      <View style={{flexDirection:'row-reverse'}}>
        <TouchableOpacity onPress={save_data}>
    <Image style={{resizeMode:'contain',width:100,height:60}}source={require('./assets/saveBtn.png')}/>  
    </TouchableOpacity>
    <TouchableOpacity onPress={load_data}>
    <Image style={{resizeMode:'contain',width:133,height:63}}source={require('./assets/loadBtn.png')}/>  
    </TouchableOpacity>
    <TouchableOpacity onPress={function(){
      navigation.navigate('Sub');}}>
    <Image style={{resizeMode:'contain',width:137,height:63}}source={require('./assets/rcmBtn.png')}/>  
    </TouchableOpacity>
        </View>
      <View style={{alignItems:'center',flexDirection:'row'}}>
        <TextInput style={styles.input_st} onChangeText={setA}/>
        <TouchableOpacity style={{margin:10}} onPress={function(){
          user_menu.push({name:A});
          setExtra(!extra);
          Setfresh(fresh+1);
          
        }}>
          <Text style={{padding:15,borderRadius:10,fontSize:30,backgroundColor:'rgb(200,200,200)'}}>+</Text>
        </TouchableOpacity>
            </View>


    <FlatList
    data={user_menu}
    extraData={extra}
    renderItem={
      function({item,index}){
        const color=(index==sel)?'gray':'black';
        return <TouchableOpacity style={{padding:10,margin:10,flexDirection:'row',backgroundColor:'lightgray',borderRadius:10}}
        onPress={function(){setSel(index);setExtra(!extra);}}>
          <Text style={{fontSize:20,marginHorizontal:5,color}}>{item.name}</Text>
        </TouchableOpacity>;
      }
    }
    />
    <View style={{flexDirection:'row-reverse',alignItems:'center'}}>
    <TouchableOpacity onPress={function () {
            if (sel != null) user_menu.splice(sel, 1);
            setSel(null);
            setExtra(!extra);
            }}>
      <Image style={{resizeMode:'contain',width:50,height:50,marginBottom:30,marginRight:10}}source={require('./assets/trash.png')}/>  
    </TouchableOpacity>
    <TouchableOpacity onPress={function(){
      user_menu.splice(0,user_menu.length);
      setExtra(!extra);
    }}>
      <Text style={{fontSize:20,color:'lightgray',margin:10}}>clear</Text>
    </TouchableOpacity>
    </View>
     <TouchableOpacity style={{marginLeft:100,marginRight:100,borderRadius:20,alignItems:'center'}}
    onPress={function (){navigation.navigate('Thr')}}>
         <Image style={{ resizeMode:'contain',width:400,height:80,marginBottom:30}}source={require('./assets/sec2Btn.png')}></Image>
       </TouchableOpacity>
    </ScrollView>
  );
  
}









function HomeScreen({navigation}){
return(
  <View style={{alignItems:'center'}}>
      <StatusBar style="auto" />
      <ImageBackground style={{height:'100%',width:'100%'}}
     source={require('./assets/main.png')}>

       <TouchableOpacity style={[styles.mainBtn,{marginTop:400}]} onPress={function (){navigation.navigate('Sec1')}}>
         <Image style={{ resizeMode:'contain',width:700,height:200}}source={require('./assets/mainBtn1.png')}></Image>
       </TouchableOpacity>

       <TouchableOpacity style={{alignItems:'center',margin:40,borderRadius:40}} onPress={function (){navigation.navigate('Sec2'),user_menu=[]}}>
         <Image style={{ resizeMode:'contain',width:700,height:230}}source={require('./assets/mainBtn2.png')}></Image>
       </TouchableOpacity>

      </ImageBackground>
    </View>
);
}




