public class test{
	public static void main(String[] args) {
		int[] arrOld = {1,2,3,4,5};
		int[] arrNew = {};
		for(int i = arrOld.length-1;i>=0;i--){
			arrNew[arrNew.length] = arrOld[i];

		}


		for(int i = 0;i<arrNew.length;i++){
			System.out.println(arrNew[i]);
		}
		
	}
}
