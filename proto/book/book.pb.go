// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.35.2
// 	protoc        v4.25.1
// source: proto/book/book.proto

package book

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type BookById struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *BookById) Reset() {
	*x = BookById{}
	mi := &file_proto_book_book_proto_msgTypes[0]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *BookById) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*BookById) ProtoMessage() {}

func (x *BookById) ProtoReflect() protoreflect.Message {
	mi := &file_proto_book_book_proto_msgTypes[0]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use BookById.ProtoReflect.Descriptor instead.
func (*BookById) Descriptor() ([]byte, []int) {
	return file_proto_book_book_proto_rawDescGZIP(), []int{0}
}

type Book struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Msg string `protobuf:"bytes,1,opt,name=msg,proto3" json:"msg,omitempty"`
}

func (x *Book) Reset() {
	*x = Book{}
	mi := &file_proto_book_book_proto_msgTypes[1]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *Book) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Book) ProtoMessage() {}

func (x *Book) ProtoReflect() protoreflect.Message {
	mi := &file_proto_book_book_proto_msgTypes[1]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Book.ProtoReflect.Descriptor instead.
func (*Book) Descriptor() ([]byte, []int) {
	return file_proto_book_book_proto_rawDescGZIP(), []int{1}
}

func (x *Book) GetMsg() string {
	if x != nil {
		return x.Msg
	}
	return ""
}

var File_proto_book_book_proto protoreflect.FileDescriptor

var file_proto_book_book_proto_rawDesc = []byte{
	0x0a, 0x15, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x62, 0x6f, 0x6f, 0x6b, 0x2f, 0x62, 0x6f, 0x6f,
	0x6b, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x04, 0x62, 0x6f, 0x6f, 0x6b, 0x22, 0x0a, 0x0a,
	0x08, 0x42, 0x6f, 0x6f, 0x6b, 0x42, 0x79, 0x49, 0x64, 0x22, 0x18, 0x0a, 0x04, 0x42, 0x6f, 0x6f,
	0x6b, 0x12, 0x10, 0x0a, 0x03, 0x6d, 0x73, 0x67, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x03,
	0x6d, 0x73, 0x67, 0x32, 0x37, 0x0a, 0x0b, 0x42, 0x6f, 0x6f, 0x6b, 0x53, 0x65, 0x72, 0x76, 0x69,
	0x63, 0x65, 0x12, 0x28, 0x0a, 0x08, 0x67, 0x65, 0x74, 0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x12, 0x0e,
	0x2e, 0x62, 0x6f, 0x6f, 0x6b, 0x2e, 0x42, 0x6f, 0x6f, 0x6b, 0x42, 0x79, 0x49, 0x64, 0x1a, 0x0a,
	0x2e, 0x62, 0x6f, 0x6f, 0x6b, 0x2e, 0x42, 0x6f, 0x6f, 0x6b, 0x22, 0x00, 0x42, 0x11, 0x5a, 0x0f,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x62, 0x6f, 0x6f, 0x6b, 0x3b, 0x62, 0x6f, 0x6f, 0x6b, 0x62,
	0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_proto_book_book_proto_rawDescOnce sync.Once
	file_proto_book_book_proto_rawDescData = file_proto_book_book_proto_rawDesc
)

func file_proto_book_book_proto_rawDescGZIP() []byte {
	file_proto_book_book_proto_rawDescOnce.Do(func() {
		file_proto_book_book_proto_rawDescData = protoimpl.X.CompressGZIP(file_proto_book_book_proto_rawDescData)
	})
	return file_proto_book_book_proto_rawDescData
}

var file_proto_book_book_proto_msgTypes = make([]protoimpl.MessageInfo, 2)
var file_proto_book_book_proto_goTypes = []any{
	(*BookById)(nil), // 0: book.BookById
	(*Book)(nil),     // 1: book.Book
}
var file_proto_book_book_proto_depIdxs = []int32{
	0, // 0: book.BookService.getHello:input_type -> book.BookById
	1, // 1: book.BookService.getHello:output_type -> book.Book
	1, // [1:2] is the sub-list for method output_type
	0, // [0:1] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_proto_book_book_proto_init() }
func file_proto_book_book_proto_init() {
	if File_proto_book_book_proto != nil {
		return
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_proto_book_book_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   2,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_proto_book_book_proto_goTypes,
		DependencyIndexes: file_proto_book_book_proto_depIdxs,
		MessageInfos:      file_proto_book_book_proto_msgTypes,
	}.Build()
	File_proto_book_book_proto = out.File
	file_proto_book_book_proto_rawDesc = nil
	file_proto_book_book_proto_goTypes = nil
	file_proto_book_book_proto_depIdxs = nil
}