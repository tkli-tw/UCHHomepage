
//-------------------------------------------------------
// �w�q�@�� Holder ���O
// �Ψө�m brick�A
// �򥻤W�N�O�@�� div�A
// �ǤJ�@�� div�A�b�o�̭��h�j�w�@�ǰѼƤΤ@�Ǥ�k�A
// �� brick ���K ��i�ӡA
// �D�n �n�w�q�@�� ��m���覡(style)�A�M��A�g�@�Ǭ۹�������k�h����C
// tkli ......20131021
//-------------------------------------------------------
function Holder(theHolder, style){
	// �`�N�@�I
	// ���[ this.XXXXX ���O �����ܼơA
	// �S�[���A�� �[ ���O�W�p Holder.XXXX ���O���O�ܼơA(�n�O�o)
	this._style = style;
	this._theHolder = theHolder;
	
	//-------------------------------------------------------
	// ���� ��m brick ���ʧ@
	// ���z�A�o������ �ϥ� ����ɦV��(OO) ���h��(polynormial) �ӹ�@���A
	// ���A�i�o�o��·ФF�A
	// �p�G���� �o�����O�V�ӶV�j�A�ݭn�X�i�A���N�令�z�L �~�өM�h�����覡�ӹ�@�C
	//-------------------------------------------------------
	this.place = function(theBrick){
		if (this._style === 'flow') placeByFlow(theBrick);     // ��V�C�X���覡�A�C�쩳 �N���C �~��C
		if (this._style === 'table') placeByTable(theBrick);   // �G����榡 ��k
		if (this._style === 'list') placeByList(theBrick);     // �a�V�C�X
		if (this._style === 'group') placeByGroup(theBrick);   // �s�զ����C�X�A�C�s���H flow �覡�C�X�C
		if (this._style === 'tree') placeByTree(theBrick);     // �𪬦����C�X�C(�ȵL��@)
		if (this._style === 'tab-group') placeByTabGroup(theBrick);    // �s�զ����C�X�A�C�s���@�ӭ��ҡA�H���Ҥ����s�աC(�ȵL��@)
	}

	//-------------------------------------------------------
	// ���� ��m brick ���ʧ@
	// ��V�C�X���覡�A�C�쩳 �N���C �~��C
	// 1 2 3 4 5 6 7 8
	// 9 10 ........
	//-------------------------------------------------------
	this.placeByFlow = function(theBrick){
		// �g��o�� �o�{ �A
		// �٬O�n���~�Ӫ��覡�ӹ�@�A
		// �]�� ���ȩ�m����k�|���Ҥ��P�A��m�ɩһݭn���Ѽ� �U���ۦP���A
		// �]���A�n�ӧO�g�A�~�Ӧb�@�� �j�� Holder ���O�U�A�~��C
		// tkli ......  20131021.
	}
	
	
}




